import React, { useEffect, useRef, useState } from "react";
import { InputWrapper, NotFoundText, TableTitle, Wrapper } from "./styled";
import { toast } from "react-toastify";
import { search } from "services/api";
import TracksTable from "components/TracksTable";
import Input from "components/ui/Input";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, isLoading] = useDebounceLoadData(searchQuery);
  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </InputWrapper>
      {searchQuery && (
        <div>
          <TableTitle>Results by: {searchQuery}</TableTitle>
          {(isLoading || (!isLoading && tracks?.length > 0)) && (
            <TracksTable isLoading={isLoading} tracks={tracks} />
          )}
        </div>
      )}
      {searchQuery && !isLoading && tracks?.length <= 0 && (
        <NotFoundText>Nothing was found :(</NotFoundText>
      )}
    </Wrapper>
  );
}

function useDebounceLoadData(searchQuery) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchTimeout = useRef();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true); // set variable that tracks loading of an component to true, as it this moment loading starts
        const searchData = await search(searchQuery);
        setData(searchData);
      } catch (err) {
        toast.error(err.message); // If error is catch call 'toast' from react-toastify
      } finally {
        setIsLoading(false); // loading has finished, so at the very end variable loading changes to false.
      }
    };
    if (searchQuery) {
      clearTimeout(fetchTimeout.current);
      fetchTimeout.current = setTimeout(loadData, 500);
    } else {
      setData(null);
    }
  }, [searchQuery]);

  return [data, isLoading];
}
export default Search;
