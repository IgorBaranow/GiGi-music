import IconButton from "components/ui/IconButton";
import { Text, SubText } from "components/ui/Typography";
import styled from "styled-components";
import { device } from "styles/BreakPoints";

export const StyledTrackRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-radius: 10px;
  background-color: ${({ theme, $isActive }) => $isActive ? theme.colors.lightWhite : "transparent"};
  .text {display: ${({ $isActive }) => ($isActive ? "none" : "flex")};}
  .icon {display: ${({ $isActive }) => ($isActive ? "block" : "none")};}
  &:hover {
    .text {
      display: none;
    }

    .icon {
      display: block;
    }
    background-color: ${({ theme }) => theme.colors.lightWhite};
  }

  td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-left: 20px;
    justify-content: center;
  }

  td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const TableData = styled.td`
  padding: 10px 20px 10px 0px;
`;

export const TrackInfo = styled(TableData)`
  display: flex;
  align-items: center;
  gap: 25px;

  ${device.md} {
    gap: 15px;
  }
`;

export const TrackInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px 10px 0;

  ${device.md} {
    gap: 2px;
  }
`;

export const TrackInfoImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 15px;

  ${device.md} {
    height: 45px;
    width: 45px;
    border-radius: 10px;
  }
`;
export const TrackTitle = styled(Text)`
  line-clamp: 1; // With this property I define how mane lines of text I wanna have. To make this work I also have to define display property to -webkit-box
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  ${device.md} {
    font-size: 18px;
    line-height: 22px;
  }
`;
export const TrackSubText = styled(SubText)`
  line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  ${device.md} {
    font-size: 16px;
    line-height: 19px;
  }
`;
export const SongNumberText = styled(SubText)`
  color: ${({ theme }) => theme.colors.secondaryGrey};
  display: flex;
  justify-content: center;
`;

export const StyledIconButton = styled(IconButton)`
  margin: 0 auto;
`;

export const IconWrapper = styled.div`
  margin: 0 auto;
  width: 20px;
  height: 20px;
  display: none;
`;
