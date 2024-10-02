import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import util from "util";
import { getStorage, ref } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../configs/FirebaseConfig";

const client = new textToSpeech.TextToSpeechClient();

export async function POST(req) {
  try {
    const { text, id } = await req.json();

    const storageRef = ref(storage, "ai-shorts-Video-Files/" + id + ".mp3");

    if (!text) {
      return NextResponse.json(
        {
          error: "Text is required.",
        },
        {
          status: 400,
        }
      );
    }

    const request = {
      input: {
        text,
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

    const filePath = path.join(
      process.cwd(),
      "public",
      `${id || "output"}.mp3`
    );

    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile(filePath, response.audioContent, "binary");

    const audioBuffer = Buffer.from(response.audioContent, "binary");

    await uploadBytes(storageRef, audioBuffer, {
      contentType: "audio/mp3",
    });

    const downloadUrl = await getDownloadURL(storageRef);

    console.log("downLoadURL", downloadUrl);

    return NextResponse.json({
      Result: downloadUrl,
      fileUrl: `/public/${id || "output"}.mp3`,
    });
  } catch (error) {
    console.error("Error during text-to-speech synthesis:", error);

    return NextResponse.json(
      {
        error: "Text-to-speech synthesis failed.",
      },
      {
        status: 500,
      }
    );
  }
}
