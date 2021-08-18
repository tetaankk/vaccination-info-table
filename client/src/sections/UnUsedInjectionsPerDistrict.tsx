import { FunctionComponent } from "react";
import { IOrder } from "../Interfaces";

interface Props {}

interface UnUsedInjectionsPerDistrictProps {
  injections: IOrder[];
}

const UnUsedInjectionsPerDistrict: FunctionComponent<UnUsedInjectionsPerDistrictProps> =
  (props) => {
    const { injections } = props;
    return <div>ads</div>;
  };

export default UnUsedInjectionsPerDistrict;
