import Audience from "../components/site/Audience";
import Direction from "../components/site/Direction";
import Faq from "../components/site/Faq";
import FinalCta from "../components/site/FinalCta";
import Guarantee from "../components/site/Guarantee";
import Hero from "../components/site/Hero";
// import Journey from "../components/site/Journey";
import Learn from "../components/site/Learn";
import Method from "../components/site/Method";
import Nav from "../components/site/Nav";
import Offer from "../components/site/Offer";
import Professor from "../components/site/Professor";
import Results from "../components/site/Results";
import SectionDeck from "../components/site/SectionDeck";
// import ScrollingBanners from "../components/site/ScrollingBanners";

export default function Home() {
    return (
        <main>
            <Nav />
            <SectionDeck>
                <Hero />
                <Direction />
                <Method />
                <Learn />
                {/* <Journey /> */}
                <Audience />
                <Offer />
                <Guarantee />
                <Results />
                <Professor />
                <Faq />
                <FinalCta />
            </SectionDeck>
            {/* <ScrollingBanners /> */}
        </main>
    );
}
