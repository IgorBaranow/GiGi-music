import { loadCharts, loadTopRadioTracks } from "services/api";
import { SectionTitle } from "components/ui/Typography";
import { Hero, Genres, Artists } from "components/HomePage";
import TracksTable from "components/TracksTable";
import { GreyTitle, TrendsAndArtistsSection, StyledAside } from "./styled";
import { useLoadData } from "hooks/useLoadData";
// Import Swiper styles. I use it in genres and artists and to not double import to the 2 components it is better to import it one here.
import "swiper/css";
import "swiper/css/free-mode";

function Home() {
  const [data, isLoading] = useLoadData(() => Promise.all([loadCharts(), loadTopRadioTracks()]));
  const [chart, radio] = data || [];
  return (
    // Wrapp every components with <ContentWrapper> component to have consistent styling, in this case padding for all main elements will be 120px and if I wanna change it, I can change it in just one place for every main component.
    <main>
      <Hero tracks={radio} />
      <Genres />
      <TrendsAndArtistsSection>
        <div>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Tranding right now</SectionTitle>
          <TracksTable isLoading={isLoading} tracks={chart?.tracks?.data} />
        </div>
        <StyledAside>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Top Artists</SectionTitle>

          <Artists isLoading={isLoading} artists={chart?.artists?.data} />
        </StyledAside>
      </TrendsAndArtistsSection>
    </main>
  );
}

export default Home;
