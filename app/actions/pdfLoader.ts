import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { PrismaClient, Document, Prisma } from "@prisma/client";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

export default async function execute() {
    "use server";
    const content = "/home/cokingtins1/Documents/test gpt docs/2024_SSOE_Benefits_Guide.pdf";
    const loader = new PDFLoader(content);
    const docs = await loader.load();

    const model = new Ollama({
        model: "llama3.1",
        temperature: 0,
        maxRetries: 2,
    });

    const extractedText = docs.map((doc) => doc.pageContent).join("\n");

    const textSplitter = new CharacterTextSplitter({
        separator: "\n",
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const texts = await textSplitter.createDocuments([extractedText]);

    const embeddings = new HuggingFaceInferenceEmbeddings({
        apiKey: process.env.HUGGINGFACEHUB_API_KEY,
    });

    const db = new PrismaClient();

    const vectorStore = PrismaVectorStore.withModel<Document>(db).create(embeddings, {
        prisma: Prisma,
        tableName: "Document",
        vectorColumnName: "vector",
        columns: {
            id: PrismaVectorStore.IdColumn,
            content: PrismaVectorStore.ContentColumn,
        },
    });

    await vectorStore.addModels(
        await db.$transaction(
            texts.map((content) => db.document.create({ data: { content: content.pageContent } }))
        )
    );

    const vectorStoreRetriever = vectorStore.asRetriever();

    const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", SYSTEM_TEMPLATE],
        ["human", "{question}"],
    ]);

    const chain = RunnableSequence.from([
        {
            context: vectorStoreRetriever,
            question: new RunnablePassthrough(),
        },
        prompt,
        model,
        new StringOutputParser(),
    ]);

    const answer = await chain.invoke("how much PTO do I have as an associate employee?");

    console.log(answer);
}
