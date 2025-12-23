import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import TracksTable from "components/TracksTable";
import { Music } from "components/ui/Icons";
import { MainTitle, SectionTitle, SmallText } from "components/ui/Typography";
import { loadArtist } from "services/api";
import { theme } from "styles/Theme";
import { useWindowSize } from "hooks/useWindowSize";
import { breakpoints } from "styles/BreakPoints";
import {
  ArtistImage,
  ArtistImageLoaderWrapper,
  ArtistInfoWrapper,
  SongsCountWrapper,
  TextWrapper,
  Wrapper,
} from "./styled";
import { useLoadData } from "hooks/useLoadData";

function Artist() {
  const { width } = useWindowSize();
  const { artistId } = useParams();
  const [artist, isLoading] = useLoadData(() => loadArtist(artistId));

  return (
    <Wrapper>
      <ArtistInfoWrapper>
        {artist ? (
          <ArtistImage src={artist?.artist?.picture_big} alt={`${artist?.artist?.name}'s photo`} />
        ) : (
          <Skeleton
            width={width < breakpoints.md ? "100%" : 350}
            height={width < breakpoints.md ? 176 : 350}
            borderRadius={25}
            wrapper={ArtistImageLoaderWrapper}
          />
        )}
        <TextWrapper>
          <MainTitle>{artist?.artist?.name || <Skeleton width={150} />}</MainTitle>
          <SongsCountWrapper>
            <Music color={theme.colors.secondaryGrey} />
            <SmallText>
              {isLoading ? <Skeleton width={40} /> : `${artist?.artist?.nb_fan} Fans`}
            </SmallText>
          </SongsCountWrapper>
        </TextWrapper>
      </ArtistInfoWrapper>
      <div>
        <SectionTitle>Top Tracks</SectionTitle>
        <TracksTable isLoading={isLoading} tracks={artist?.tracks} />
      </div>
    </Wrapper>
  );
}

export default Artist;
