import { styled } from "styled-components";
import { ReactComponent as PlayIcon } from "assets/play.svg";
import { ReactComponent as SkipIcon } from "assets/skip.svg";
import { ReactComponent as PauseIcon } from "assets/pause.svg";
import { ReactComponent as VolumeIcon } from "assets/volume.svg";
import { ReactComponent as MusicIcon } from "assets/music.svg";
import { ReactComponent as ArrowLeftIcon } from "assets/arrowLeftIcon.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import { ReactComponent as HeartIcon } from "assets/heart.svg";
import { ReactComponent as UsersIcon } from "assets/users.svg";
import { ReactComponent as Logo } from "assets/logo.svg";

const Play = styled(PlayIcon)`
  fill: ${(props) =>
    props.color ||
    "white"}; // if color is specified in App.js via props - then specified color, otherwise - white
  stroke: ${(props) => props.color || "white"};
`;

const SkipLeft = styled(SkipIcon)`
  fill: ${(props) => props.color || "white"};
`;

// here as parameter I pass SkipLeft to have all styles from SkipLeft icon, so now I already have fill specified and I should't specify it, just add additional styles
const SkipRight = styled(SkipLeft)`
  transform: rotate(180deg);
`;

const Pause = styled(PauseIcon)`
  fill: ${(props) => props.color || "white"};
  stroke: ${(props) => props.color || "white"};
`;

const Volume = styled(VolumeIcon)`
  stroke: ${(props) => props.color || "white"};
`;

const Music = styled(MusicIcon)`
  stroke: ${(props) => props.color || "white"};
`;

const ArrowLeft = styled(ArrowLeftIcon)`
  stroke: ${(props) => props.color || "white"};
`;

const ArrowRight = styled(ArrowLeft)`
  stroke: ${(props) => props.color || "white"};
  transform: rotate(180deg);
`;

const Search = styled(SearchIcon)`
  fill: ${(props) => props.color || "white"};
`;

const Heart = styled(HeartIcon)`
  stroke: ${(props) => props.color || "white"};
`;

const Users = styled(UsersIcon)`
  fill: ${(props) => props.color || "white"};
`;

export {
  Play,
  SkipLeft,
  SkipRight,
  Pause,
  Volume,
  Music,
  ArrowLeft,
  ArrowRight,
  Search,
  Heart,
  Users,
  Logo,
};

// Final deployment attempt
