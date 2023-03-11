import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useMemo } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import Typewriter from "typewriter-effect";
import HasprCursor from "haspr-cursor"; // Import Wrapper
import "haspr-cursor/dist/cursor.css"; // Import Style sheet

import {
  DispatchCursor,
  CURSOR_SHOW,
  CURSOR_HIDE,
  CURSOR_COLOR,
  CURSOR_TEXT,
  CURSOR_EXCLUSION,
  CURSOR_STICKY,
  CURSOR_MAGNETIC,
  CURSOR_VIDEO,
  CURSOR_REVEAL,
  CURSOR_UNDERLINE,
} from "haspr-cursor";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "sk-...dTlc",
});
const openai = new OpenAIApi(configuration);

const Home = () => {
  const [audio, setAudio] = useState();
  const [transcript, setTranscript] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = DispatchCursor();
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const baseStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "white",
  };

  const contStyle = {
    width: "17vw",
    height: "10vw",
    borderRadius: "1.5vw",
    display: "grid",
    placeItems: "center",
    padding: "1.5vw",
    margin: "1.5vw",
    textAlign: "center",
    cursor: "pointer",
    background: "lightgray",
  };

  const titleStyle = {
    width: "90vw",
    height: "5vw",
    background: "lightgray",
    textAlign: "center",
    lineHeight: "5vw",
    fontSize: "2vw",
    fontWeight: "bold",
    borderRadius: "0.75vw",
  };

  const underlineStyle = {
    position: "absolute",
    width: "100%",
    height: "1px",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    background: "black",
    bottom: "0.5px",
  };
  const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);

  const startRecording = () => {
    if (isBlocked) {
      console.log("Permission Denied");
      setIsBlocked(true);
    } else {
      recorder
        .start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "test.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        setBlobURL(URL.createObjectURL(file));
        // Convert to base64
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = function () {
          const base64data = reader.result;
          // Only send the base64 string
          const base64String = base64data.split(",")[1];
          setAudio(base64String);
        };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRecording(false);

    const response = await fetch("/api/whisper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audio: audio }),
    });

    const data = await response.json();
    setLoading(false);
    setTranscript(data.modelOutputs[0].text);
  };

  //   // const resp = openai.createTranscription(
  //   //  audio,
  //   //   "whisper-1"
  //   // );

  // console.log(resp)
  return (
    <HasprCursor>
      <div className={styles.container}>
        <Head>
          <title>InstaDocket🚀</title>
          <meta name="description" content="InstaDocket" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://use.typekit.net/fxx5dng.css" />
          <link rel="stylesheet" type="text/css" href="../styles/base.css" />
        </Head>

        <div className={styles.banner}>
          <p>
            <a
              href="https://github.com/aasim-syed/instadocket"
              target="_blank"
              rel="noopener noreferrer"
            >
              Note Beta version🔗
            </a>
          </p>
        </div>

        <main className={styles.main}>
          <h1
            id="title"
            onMouseEnter={() => CURSOR_COLOR("RED")}
            className={styles.title}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("InstaDocket🚀<br>Co-piolet for Lawyers⚖️")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(2500)
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
            />
          </h1>

          <h2 className={styles.description}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Generate Transcript📜 from Audio🔉")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(2900)
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
            />
          </h2>
          {isRecording ? (
            <p className={styles.warning}>
              {" "}
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Recording in progress...⌛")
                    .callFunction(() => {
                      console.log("String typed out!");
                    })
                    .pauseFor(2500)
                    .callFunction(() => {
                      console.log("All strings were deleted");
                    })
                    .start();
                }}
              />{" "}
            </p>
          ) : (
            <p className={styles.warning}>
              {/* {" "}
            Requires browser microphone permission.{" "} */}
            </p>
          )}
          {isBlocked ? (
            <p className={styles.blocked}> Microphone access is blocked. </p>
          ) : null}

          <div className={styles.whispercontainer}>
            <div className={styles.allbuttons}>
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={styles.recordbutton}
              >
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Record")
                      .callFunction(() => {
                        console.log("String typed out!");
                      })
                      .pauseFor(2900)
                      .callFunction(() => {
                        console.log("All strings were deleted");
                      })
                      .start();
                  }}
                />
              </button>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className={styles.stopbutton}
              >
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Stop")
                      .callFunction(() => {
                        console.log("String typed out!");
                      })
                      .pauseFor(2900)
                      .callFunction(() => {
                        console.log("All strings were deleted");
                      })
                      .start();
                  }}
                />
              </button>
            </div>

            <div className={styles.audiopreview}>
              <audio src={blobURL} controls="controls" />
            </div>
            <div className={styles.loading}>
              {loading ? <p>Loading... please wait.</p> : <p>{transcript}</p>}
            </div>
            <div className={styles.generatebuttonroot}>
              <button
                type="submit"
                className={styles.generatebutton}
                onClick={handleSubmit}
                disabled={!audio}
              >
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Generate")
                      .callFunction(() => {
                        console.log("String typed out!");
                      })
                      .pauseFor(2900)
                      .callFunction(() => {
                        console.log("All strings were deleted");
                      })
                      .start();
                  }}
                />
              </button>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://www.github.com/aasim-syed/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀<span className={styles.logo}>InstaDocket🚀 </span>
          </a>
        </footer>
      </div>
    </HasprCursor>
  );
};

export default Home;
