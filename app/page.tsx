import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EachUtils from "@/components/ui/eachutils";
import Navbar from "@/components/ui/navbar";
import { getUser } from "@/lib/supabase/server";
import { ArticleType } from "@/types/main";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

const articles: ArticleType[] = [
  {
    title: "The Rise of AI in Everyday Life",
    description:
      "An overview of how artificial intelligence is transforming our daily routines.",
  },
  {
    title: "10 Tips for Healthy Eating",
    description:
      "Simple and practical tips to improve your diet and overall health.",
  },
  {
    title: "Exploring the Beauty of National Parks",
    description:
      "A guide to some of the most stunning national parks around the world.",
  },
  {
    title: "The Future of Renewable Energy",
    description:
      "Insights into the technologies shaping the energy landscape of tomorrow.",
  },
  {
    title: "Mastering Remote Work",
    description:
      "Strategies to stay productive and connected while working from home.",
  },
  {
    title: "The Benefits of Minimalist Living",
    description:
      "How adopting a minimalist lifestyle can lead to more fulfillment and less stress.",
  },
  {
    title: "Top Programming Languages in 2024",
    description:
      "A look at the most popular and in-demand programming languages this year.",
  },
  {
    title: "Traveling on a Budget",
    description:
      "Practical tips to explore the world without breaking the bank.",
  },
  {
    title: "Understanding Cryptocurrency",
    description:
      "A beginner's guide to the world of digital currencies and blockchain technology.",
  },
  {
    title: "How to Start a Successful Blog",
    description:
      "Steps and strategies to create and grow a blog that stands out.",
  },
  {
    title: "The Science Behind Better Sleep",
    description:
      "Explore the factors that contribute to a good night's rest and how to achieve it.",
  },
  {
    title: "Building a Personal Brand Online",
    description:
      "Why personal branding matters and how to build your online presence effectively.",
  },
  {
    title: "The Impact of Climate Change",
    description:
      "Examining the current and future effects of climate change on our planet.",
  },
  {
    title: "Learning a New Language Fast",
    description:
      "Proven techniques to quickly pick up a new language and start communicating.",
  },
  {
    title: "Top Gadgets to Look Out for in 2024",
    description: "A rundown of the most anticipated tech gadgets of the year.",
  },
  {
    title: "The Art of Storytelling in Business",
    description:
      "How storytelling can elevate your marketing and connect with your audience.",
  },
  {
    title: "Investing for Beginners",
    description:
      "Key principles and tips to start investing wisely and grow your wealth.",
  },
  {
    title: "The History of Space Exploration",
    description:
      "A journey through humanity's greatest milestones in space exploration.",
  },
  {
    title: "How to Stay Motivated",
    description:
      "Techniques to maintain motivation and achieve your personal and professional goals.",
  },
  {
    title: "The Power of Positive Thinking",
    description:
      "Understanding how positivity can transform your mindset and outlook on life.",
  },
];

const Home = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="px-4 h-[3000px]">
      <Navbar />
      <h1 className="text-3xl font-semibold">
        Welcome, {user.user_metadata.username}.
      </h1>
      <div className="w-full bg-gradient-to-r from-green-400 via-yellow-300 flex flex-col justify-center items-center to-teal-500 shadow p-4 rounded-lg mt-4 text-black">
        <Link href="/" className="md:text-xl font-semibold hover:underline">
          This website is still in the development and testing stage. If you
          find a bug or damage, you can report it by pressing this text.
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
        <EachUtils
          of={articles}
          render={(item) => (
            <RenderCard title={item.title} description={item.description} />
          )}
        />
      </div>
    </div>
  );
};

type PropsRenderCard = ArticleType;

const RenderCard: FC<PropsRenderCard> = ({ title, description }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Read</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Home;
