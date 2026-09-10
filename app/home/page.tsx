import Home from "./Acheivement";
import Commitment from "./Commitement";
import ContactPage from "./ContactPage";
import DiasporaArticlesBento from "./DiasporaArticlesBento";
import TinubusImpactHorizontalScroll from "./DiasporaImpact";
import Footer from "./Footer";
import ForumBento from "./ForumBento";
import Hero from "./Hero";
import JoinDiasporaNetworkPage from "./JoinDiaspora";
import ManBehindTheVision from "./ManBehindTheVision";
import TinubuRoadmap from "./RoadMap";
import SignatureWall from "./Signature";

export default function HomePage() {
  return (
    <main className="relative">
      <section id="home">
        <Hero />
      </section>
      <section id="commitment">
        <Commitment />
      </section>
      <section id="man-behind-the-vision">
        <ManBehindTheVision />
      </section>
      <section id="diaspora-impact">
        <TinubusImpactHorizontalScroll />
      </section>
      <section id="forum">
        <ForumBento />
      </section>
      <section id="articles">
        <DiasporaArticlesBento />
      </section>
      <section id="signature">
        <SignatureWall />
      </section>
      <section id="join">
        <JoinDiasporaNetworkPage />
      </section>
      <section id="roadmap">
        <TinubuRoadmap />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
      <Footer />
    </main>
  );
}
