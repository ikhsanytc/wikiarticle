"use client";

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import CustomButton from "@/components/ui/custom-button";

const LandingPage = () => {
  const [startUpCondition, setStartUpCondition] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  function handleClickContinue() {
    if (!isLoading) {
      setStartUpCondition(true);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 7000);
  }, []);
  return (
    <div
      className="px-4 flex justify-center relative items-center min-h-screen bg-background-gradient text-white"
      onClick={isLoading ? () => {} : handleClickContinue}
    >
      {startUpCondition ? (
        <motion.div
          className="text-center"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Wikiarticle allows you to read article.",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Wikiarticle allows you to write article.",
              1000,
              "Wikiarticle allows you to comments article.",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              fontWeight: "bold",
            }}
            repeat={Infinity}
          />
          <motion.div
            className="mt-4"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 2,
            }}
          >
            <p className="text-2xl font-semibold">Starts with?</p>
            <div className="flex mt-4 justify-center gap-4 items-center">
              <CustomButton>
                <Link href="/sign-in">Sign In</Link>
              </CustomButton>
              <CustomButton variant="filled">
                <Link href="/sign-up">Sign Up</Link>
              </CustomButton>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="flex flex-col gap-4 justify-center text-center items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RenderWelcomeMessage />
            </motion.div>
            {isLoading ? (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 1,
                }}
                className="absolute bottom-5 flex flex-col gap-4 justify-center items-center"
              >
                <div className="loader"></div>
                <p className="font-semibold text-xl">Loading</p>
              </motion.div>
            ) : (
              <div className="text-center absolute bottom-5">
                <p className="text-xl font-semibold">
                  Tap anywhere to continue.
                </p>
              </div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

function RenderWelcomeMessage() {
  return (
    <>
      <TypeAnimation
        sequence={[
          "Welcome.",
          1000,
          "Selamat datang.",
          1000,
          "مرحباً",
          1000,
          "Welkom.",
          1000,
          "Witamy.",
          1000,
          "Bienvenu(e).",
          1000,
          "ยินดีต้อนรับ",
          1000,
          "добро пожаловать",
          1000,
          "स्वागत छ",
          1000,
          "환영합니다.",
          1000,
          "Bienvenido.",
          1000,
          "Καλώς ήρθατε.",
          1000,
          "ברוך הבא",
          1000,
          "Karibu.",
          1000,
          "Benvenuto.",
          1000,
          "歡迎光臨.",
          1000,
          "Tervetuloa.",
          1000,
          "Velkommen.",
          1000,
          "Добре дошли.",
          1000,
          "Hoş geldiniz.",
          1000,
          "Willkommen.",
          1000,
          "স্বাগতম.",
          1000,
          "Üdvözöljük.",
          1000,
          "Aloha.",
          1000,
          "స్వాగతం.",
          1000,
          "സ്വാഗതം.",
          1000,
          "Bem-vindo.",
          1000,
          "歡迎.",
          1000,
          "Selamat datang kembali.",
          1000,
          "स्वागत है.",
          1000,
          "Bienvenue.",
          1000,
          "Vítejte.",
          1000,
          "Welkom bij ons.",
          1000,
          "Bine ati venit.",
          1000,
          "Bienvenido/a.",
          1000,
          "Croeso.",
          1000,
          "Fáilte.",
          1000,
          "Tajukalu.",
          1000,
          "Ласкаво просимо.",
          1000,
          "Sugeng rawuh.",
          1000,
          "Benvido.",
          1000,
          "Velkomin.",
          1000,
          "Witajcie.",
          1000,
          "स्वागतम्.",
          1000,
          "Dobrodošli.",
          1000,
          "Ku soo dhawoow.",
          1000,
          "Mabuhay.",
          1000,
          "Velkommen hjem.",
          1000,
          "સ્વાગત છે.",
          1000,
          "Bienvenidos.",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{
          fontSize: "2em",
          display: "inline-block",
          fontWeight: "bold",
          textAlign: "center",
        }}
        repeat={Infinity}
      />
    </>
  );
}

export default LandingPage;
