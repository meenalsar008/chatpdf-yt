// import { OpenAIApi, Configuration } from "openai-edge";
import {OpenAI}  from "openai";
import Configuration from "openai"

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(config);
const openai = new OpenAI(
  {apiKey: process.env.OPENAI_API_KEY}
);

export async function getEmbeddings(text: string) {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text.replace(/\n/g, " "),
        encoding_format: "float",
      });
      if (response.data && response.data.length > 0) {
        return response.data[0].embedding;
      } else {
        throw new Error("No embeddings data found in response.");
      }
    } catch (error) {
      console.log("error calling openai embeddings api", error);
      throw error;
    }
}
  