import { Logo, Search } from "components/ui/Icons";
import { SectionSubtitle } from "components/ui/Typography";
import { LogoWrapper, Wrapper } from "./styled";
import IconButton from "components/ui/IconButton";
import { ContentWrapper } from "components/Layout";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Wrapper>
      <ContentWrapper display="flex" items="center" content="space-between">
        <Link to="/">
          <LogoWrapper>
            <Logo />
            <SectionSubtitle>GiMusic</SectionSubtitle>
          </LogoWrapper>
        </Link>
        <IconButton withBackground={true} height={58} width={58}>
          <Link to="/search">
            <Search />
          </Link>
        </IconButton>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Header;
