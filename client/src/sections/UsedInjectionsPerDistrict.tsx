import { FunctionComponent } from "react";
import { IVaccination } from "../Interfaces";

interface UsedInjectionsPerDistrictProps {
  injections: IVaccination[];
}

const UsedInjectionsPerDistrict: FunctionComponent<UsedInjectionsPerDistrictProps> =
  (props) => {
    const { injections } = props;
    return <div>ads</div>;
  };

export default UsedInjectionsPerDistrict;
