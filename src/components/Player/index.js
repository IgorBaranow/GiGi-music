import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import { actions } from "context/actions";
import { PlayerContext, PlayerDispatchContext } from "context/playerContext";
import {
  Wrapper,
  TrackInfoWrapper,
  TrackInfoTextWrapper,
  TrackImage,
  ArtistName,
  ControlsWrapper,
  ProgressWrapper,
  TrackTime,
  VolumeWrapper,
  TrackTitle,
  MobileTrackRow,
  BackButton,
  BigTrackImage,
} from "./styled";
import { ContentWrapper } from "components/Layout";
import IconButton from "components/ui/IconButton";
import { Pause, Play, SkipLeft, SkipRight, Volume } from "components/ui/Icons";
import { theme } from "styles/Theme";
import { formatSecondsToMSS } from "utils/time";
import { useWindowSize } from "hooks/useWindowSize";
import { breakpoints } from "styles/BreakPoints";
import { useLocation } from "react-router-dom";

function Player() {
  const { width } = useWindowSize();
  const {
    togglePlay,
    toggleOpen,
    toggleVolume,
    onTimeUpdate,
    onTrackTimeDrag,
    handleNextSong,
    handlePrevSong,
    onVolumeChange,
    playerState,
    audioRef,
    track,
    isPlaying,
  } = usePlayer({ width });
  if (!track) {
    return null;
  }

  return (
    <Wrapper
      onClick={playerState.isOpened ? null : toggleOpen}
      opened={playerState.isOpened ? "true" : undefined}
    >
      <audio
        ref={audioRef}
        src={track.preview}
        controls
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        hidden
        onEnded={handleNextSong}
      />
      <PlayerLayout
        track={track}
        handlePrevSong={handlePrevSong}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        handleNextSong={handleNextSong}
        playerState={playerState}
        onTrackTimeDrag={onTrackTimeDrag}
        toggleVolume={toggleVolume}
        onVolumeChange={onVolumeChange}
        toggleOpen={toggleOpen}
        width={width}
        opened={playerState.isOpened}
      />
    </Wrapper>
  );
}

function PlayerLayout({
  track,
  handlePrevSong,
  handleNextSong,
  togglePlay,
  isPlaying,
  playerState,
  onTrackTimeDrag,
  toggleVolume,
  onVolumeChange,
  toggleOpen,
  opened,
  width,
}) {
  if (opened) {
    return (
      <ContentWrapper display="flex" direction="column" gap={14}>
        <BackButton onClick={toggleOpen}>Back</BackButton>
        <BigTrackImage src={track.album.cover_big} alt={`${track?.album.title}'s cover`} />
        <MobileTrackRow>
          <TrackInfoWrapper>
            <TrackInfoTextWrapper>
              <TrackTitle>{track.title}</TrackTitle>
              <ArtistName>{track.artist.name}</ArtistName>
            </TrackInfoTextWrapper>
          </TrackInfoWrapper>
          <ControlsWrapper></ControlsWrapper>
        </MobileTrackRow>
        <ProgressWrapper opened={1}>
          <TrackTime>{formatSecondsToMSS(playerState.currentTime)}</TrackTime>
          <Slider
            onChange={onTrackTimeDrag}
            step={0.2}
            min={0}
            max={playerState.duration}
            value={playerState.currentTime}
            style={{ padding: "3px 0" }}
            trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
            railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
            handleStyle={{
              border: "none",
              height: 20,
              width: 20,
              backgroundColor: theme.colors.white,
              marginTop: -6,
            }}
          />
          <TrackTime last={1} grey={1}>
            {formatSecondsToMSS(playerState.duration)}
          </TrackTime>
        </ProgressWrapper>
        <ControlsWrapper opened={1}>
          <IconButton>
            <SkipLeft onClick={handlePrevSong} />
          </IconButton>
          <IconButton onClick={togglePlay} width={55} height={55} withBackground>
            {isPlaying ? <Pause /> : <Play />}
          </IconButton>
          <IconButton>
            <SkipRight onClick={handleNextSong} />
          </IconButton>
        </ControlsWrapper>
        <VolumeWrapper opened={1}>
          <IconButton height={24} width={24} onClick={toggleVolume}>
            <Volume />
          </IconButton>
          <Slider
            step={0.01}
            min={0}
            max={1}
            value={playerState.volume}
            onChange={onVolumeChange}
            style={{ padding: "3px 0" }}
            trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
            railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
            handleStyle={{
              border: "none",
              height: 20,
              width: 20,
              backgroundColor: theme.colors.white,
              marginTop: -6,
            }}
          />
        </VolumeWrapper>
      </ContentWrapper>
    );
  }
  if (width < breakpoints.lg) {
    return (
      <ContentWrapper display="flex" items="center" direction="column" gap={14}>
        <MobileTrackRow>
          <TrackInfoWrapper>
            <TrackImage src={track.album.cover} alt={`${track?.album.title}'s cover`} />
            <TrackInfoTextWrapper>
              <TrackTitle>{track.title}</TrackTitle>
              <ArtistName>{track.artist.name}</ArtistName>
            </TrackInfoTextWrapper>
          </TrackInfoWrapper>
          <ControlsWrapper>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                togglePlay();
              }}
              width={55}
              height={55}
              withBackground
            >
              {isPlaying ? <Pause /> : <Play />}
            </IconButton>
          </ControlsWrapper>
        </MobileTrackRow>
        <ProgressWrapper onClick={(event) => event.stopPropagation()}>
          <TrackTime>{formatSecondsToMSS(playerState.currentTime)}</TrackTime>
          <Slider
            onChange={onTrackTimeDrag}
            step={0.2}
            min={0}
            max={playerState.duration}
            value={playerState.currentTime}
            style={{ padding: "3px 0" }}
            trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
            railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
            handleStyle={{
              border: "none",
              height: 20,
              width: 20,
              backgroundColor: theme.colors.white,
              marginTop: -6,
            }}
          />
          <TrackTime last={1} grey={1}>
            {formatSecondsToMSS(playerState.duration)}
          </TrackTime>
        </ProgressWrapper>
      </ContentWrapper>
    );
  }
  return (
    <ContentWrapper display="flex" items="center">
      <TrackInfoWrapper>
        <TrackImage src={track.album.cover} alt={`${track?.album.title}'s cover`} />
        <TrackInfoTextWrapper>
          <TrackTitle>{track.title}</TrackTitle>
          <ArtistName>{track.artist.name}</ArtistName>
        </TrackInfoTextWrapper>
      </TrackInfoWrapper>
      <ControlsWrapper>
        <IconButton>
          <SkipLeft onClick={handlePrevSong} />
        </IconButton>
        <IconButton onClick={togglePlay} width={55} height={55} withBackground>
          {isPlaying ? <Pause /> : <Play />}
        </IconButton>
        <IconButton>
          <SkipRight onClick={handleNextSong} />
        </IconButton>
      </ControlsWrapper>
      <ProgressWrapper>
        <TrackTime>{formatSecondsToMSS(playerState.currentTime)}</TrackTime>
        <Slider
          onChange={onTrackTimeDrag}
          step={0.01}
          min={0}
          max={playerState.duration}
          value={playerState.currentTime}
          style={{ padding: "3px 0" }}
          trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
          railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
          handleStyle={{
            border: "none",
            height: 20,
            width: 20,
            backgroundColor: theme.colors.white,
            marginTop: -6,
          }}
        />
        <TrackTime grey={1}>{formatSecondsToMSS(playerState.duration)}</TrackTime>
      </ProgressWrapper>
      <VolumeWrapper>
        <IconButton height={24} width={24} onClick={toggleVolume}>
          <Volume />
        </IconButton>
        <Slider
          step={0.01}
          min={0}
          max={1}
          value={playerState.volume}
          onChange={onVolumeChange}
          style={{ padding: "3px 0" }}
          trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
          railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
          handleStyle={{
            border: "none",
            height: 20,
            width: 20,
            backgroundColor: theme.colors.white,
            marginTop: -6,
          }}
        />
      </VolumeWrapper>
    </ContentWrapper>
  );
}

function usePlayer({ width }) {
  const location = useLocation();

  const dispatch = useContext(PlayerDispatchContext);
  const { track, isPlaying } = useContext(PlayerContext);
  const [playerState, setPlayerState] = useState({
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    isOpened: false,
  });

  const audioRef = useRef();

  const togglePlay = () => dispatch({ type: actions.TOGGLE_PLAY });
  const toggleOpen = () => {
    if (width > breakpoints.lg && !playerState.isOpened) return;
    setPlayerState((prev) => ({ ...prev, isOpened: !prev.isOpened }));
  };
  const toggleVolume = () => {
    const newVolume = playerState.volume > 0 ? 0 : 1;
    onVolumeChange(newVolume);
  };

  const onTimeUpdate = () => {
    if (!audioRef?.current) return;

    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    setPlayerState((prev) => ({ ...prev, currentTime, duration }));
  };

  const onTrackTimeDrag = (newTime) => {
    if (!audioRef?.current) return;

    audioRef.current.currentTime = newTime;

    setPlayerState((prev) => ({ ...prev, currentTime: newTime }));
  };

  const onVolumeChange = (newVolume) => {
    if (!audioRef?.current) return;

    audioRef.current.volume = newVolume;

    setPlayerState((prev) => ({ ...prev, volume: newVolume }));
  };

  const handleNextSong = () => {
    dispatch({ type: actions.NEXT_SONG });
  };
  const handlePrevSong = () => dispatch({ type: actions.PREV_SONG });

  useEffect(() => {
    if (!audioRef?.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, track, isPlaying]);

  useEffect(() => {
    if (playerState.isOpened) toggleOpen();
  }, [location]);

  useEffect(() => {
    if (playerState.isOpened) {
      window.scroll(0, 0);
      document.body.style.overflow = "hidden"; //disable scrolling when player song is opened
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [playerState.isOpened]);

  if (width > breakpoints.lg && playerState.isOpened) {
    toggleOpen();
  }
  return {
    togglePlay,
    toggleOpen,
    toggleVolume,
    onTimeUpdate,
    onTrackTimeDrag,
    handleNextSong,
    handlePrevSong,
    onVolumeChange,
    playerState,
    audioRef,
    track,
    isPlaying,
  };
}

PlayerLayout.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    duration: PropTypes.number,
    preview: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
    album: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string,
      cover_big: PropTypes.string,
    }),
  }),
  handlePrevSong: PropTypes.func,
  handleNextSong: PropTypes.func,
  togglePlay: PropTypes.func,
  isPlaying: PropTypes.bool,
  playerState: PropTypes.shape({
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    volume: PropTypes.number,
  }),
  onTrackTimeDrag: PropTypes.func,
  toggleVolume: PropTypes.func,
  onVolumeChange: PropTypes.func,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  opened: PropTypes.bool,
};
export default Player;
