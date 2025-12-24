import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SubText } from "components/ui/Typography";
import {
  Table,
  TableHead,
  TableHeading,
  Line,
  TableHeadingTime,
  TableHeadingHashtag,
} from "./styled";
import TrackRow from "./TrackRow";
import Skeleton from "react-loading-skeleton";
import { PlayerContext, PlayerDispatchContext } from "context/playerContext";
import { actions } from "context/actions";
import { useWindowSize } from "hooks/useWindowSize";
import { breakpoints } from "styles/BreakPoints";

function TracksTable({ tracks, isLoading }) {
  const { width } = useWindowSize();
  const dispatch = useContext(PlayerDispatchContext);
  const { track, isPlaying, savedTrackIds } = useContext(PlayerContext);

  const handleTrackClick = (clickedTrack) => {
    if (track?.id === clickedTrack.id) {
      dispatch({ type: actions.TOGGLE_PLAY });
    } else {
      dispatch({
        type: actions.SET_TRACKS_DATA,
        track: clickedTrack,
        tracks: tracks,
        isPlaying: true,
      });
    }
  };

  const handleSaveTrackClick = (trackId) => {
    dispatch({ type: actions.TOGGLE_SAVE_TRACK, trackId });
  };

  return (
    <Table cellSpacing={0}>
      <TableHead>
        <tr>
          <TableHeading first={1}>
            <TableHeadingHashtag>{isLoading ? <Skeleton /> : "#"}</TableHeadingHashtag>
          </TableHeading>
          <TableHeading>
            <SubText>{isLoading ? <Skeleton /> : "Song name"}</SubText>
          </TableHeading>
          {width > breakpoints.md && (
            <TableHeadingTime>
              <SubText>{isLoading ? <Skeleton /> : "Time"}</SubText>
            </TableHeadingTime>
          )}
          {width > breakpoints.md && (
            <TableHeading>
              <SubText>{isLoading ? <Skeleton /> : "Album name"}</SubText>
            </TableHeading>
          )}
          <TableHeading>
            <SubText>{isLoading ? <Skeleton /> : "Actions"}</SubText>
          </TableHeading>
        </tr>
      </TableHead>
      <tbody>
        <tr>
          <Line colSpan={5} />
        </tr>
        {!isLoading &&
          tracks?.map((currentTrack, index) => (
            <TrackRow
              isPlaying={track?.id === currentTrack.id && isPlaying}
              isActive={track?.id === currentTrack.id}
              onClick={handleTrackClick}
              key={currentTrack.id}
              track={currentTrack}
              index={index}
              handleSaveTrackClick={handleSaveTrackClick}
              isSaved={savedTrackIds.includes(currentTrack.id)}
              screenWidth={width}
            />
          ))}
        {isLoading &&
          [...Array(9).keys()].map((num) => <TrackRow key={num} index={num} screenWidth={width} />)}
      </tbody>
    </Table>
  );
}

TracksTable.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
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
      }),
    }),
  ),
  isLoading: PropTypes.bool,
};

export default TracksTable;
