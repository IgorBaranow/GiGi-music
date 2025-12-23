import { MOBILE_PLAYER_HEIGHT, PLAYER_HEIGHT } from "common/constants";
import { SubText, Text } from "components/ui/Typography";
import styled from "styled-components";
import { device } from "styles/BreakPoints";

export const Wrapper = styled.div`
  display: flex;
  align-items: ${(props) => (props.opened ? "flex-start" : "center")};
  height: ${PLAYER_HEIGHT}px;
  background-color: ${({ theme, opened }) =>
    opened ? theme.colors.black : theme.colors.secondaryBlack};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex["30"]};

  ${device.lg} {
    height: ${(props) =>
      props.opened ? `100dvh` : `${MOBILE_PLAYER_HEIGHT}px`};
    flex-direction: ${(props) => (props.opened ? "column" : "row")};
    padding-bottom: ${(props) => (props.opened ? "env(safe-area-inset-bottom)" : "0")};
    border-top-right-radius: ${(props) => (props.opened ? 0 : "25px")};
    border-top-left-radius: ${(props) => (props.opened ? 0 : "25px")};
    overflow: hidden;
  }
`;

export const TrackInfoWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  min-width: 400px;
  padding-right: 15px;

  @media (max-width: 1400px) {
    min-width: 280px;
  }

  ${device.lg} {
    min-width: auto;
  }
`;

export const TrackInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 15px;

  ${device.lg} {
    gap: 2px;
  }
`;

export const TrackImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 15px;

  ${device.md} {
    height: 55px;
    width: 55px;
  }
`;

export const BigTrackImage = styled.img`
  width: 80%;
  max-width: 300px;
  aspect-ratio: 1 / 1;
  max-height: 30dvh; 
  object-fit: cover;
  border-radius: 10px;
  margin: 0 auto;
  flex-shrink: 1;
`;

export const TrackTitle = styled(Text)`
  line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ArtistName = styled(SubText)`
  line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.secondaryGrey};
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;

  ${device.lg} {
    margin: ${(props) => (props.opened ? "auto auto" : 0)};
    gap: ${(props) => (props.opened ? "20px" : "34px")};
  }
`;

export const MobileTrackRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;
  width: 100%;

  ${device.lg} {
    margin: ${(props) => (props.opened ? "20px 0" : 0)};
  }
`;

export const TrackTime = styled(SubText)`
  color: ${(props) => (props.grey ? props.theme.colors.secondaryGrey : "inherit")};
  margin: 0 20px;
  width: 80px;

  ${device.lg} {
    margin: ${(props) => (props.last ? "0 0 0 0" : "0")};
    text-align: ${(props) => (props.last ? "right" : "inherit")};
  }
`;

export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin-left: 130px;
  min-width: 180px;

  ${device.xl} {
    margin: ${(props) => (props.opened ? "20px auto 30px" : "0 0 0 60px")};
    width: ${(props) => (props.opened ? "65%" : "auto")};
  }
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 18px;
  line-height: 27px;
  padding: 10px 0;
  margin: ${(props) => (props.opened ? "10px 0" : "28px 0 30px")};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
`;