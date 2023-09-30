import useUser from "../hooks/useUser";
import { useNavigation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";

const ContentLayout = () => {
  const {
    state: { isLoading },
  } = useUser();
  const navigation = useNavigation();

  const pending = isLoading || navigation.state === "loading";

  if (pending) {
    return <Loader loading={pending} />;
  } else {
    return <Outlet />;
  }
};
export default ContentLayout;
