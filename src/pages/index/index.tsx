import Heading from "@/components/heading/Heading";
import CustomLink from "@/components/link/CustomLink";
import ROUTES from "@/constants/routes";
import acousticLogo from "@/assets/icons/logo.svg";

const Home = () => {
  return (
    <section className="max-w-7xl px-5 mx-auto py-10">
      <img
        src={acousticLogo}
        alt="Acoustic"
        className="h-10 mx-auto lg:mt-10 mt-5"
      />
      <Heading level="h1" className="text-center mt-10">
        Recruitment task
      </Heading>
      <p className="text-center mt-5">
        Task done by{" "}
        <a
          href="https://www.linkedin.com/in/dawid-banachowski-24639a1b3/"
          className="underline"
        >
          Dawid Banachowski
        </a>
      </p>
      <CustomLink to={ROUTES.ARTICLES.PATH} className="mx-auto mt-10 block">
        Show articles
      </CustomLink>
    </section>
  );
};

export default Home;
