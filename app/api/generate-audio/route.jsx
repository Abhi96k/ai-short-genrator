import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { Result } from "postcss";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();

  const request = {
    input: {
      text: text,
    },
    voice: {
      languageCode: "en-US",
      ssmlGender: "FEMALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);

  await writeFile("output.mp3", response.audioContent, "binary");

  return NextResponse.json({
    Result: "Success",
  });
}
