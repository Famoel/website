import { useSelector } from "react-redux";
import type { TRootState } from "../../../redux/store";

export const RaidTable = ({
  hasBody,
  canCancel,
}: {
  hasBody: boolean;
  canCancel: boolean;
}) => {
  const reduxRaid = useSelector((state: TRootState) => state.raid);

  return (
    <>
      {reduxRaid.raidPlan.map((raidPlan, idx) => (
        <table className="bg-primary mb-5 table w-full" key={idx}>
          <thead>
            <tr>
              <th>Raid ID: {raidPlan.id}</th>
              <th>Raid: {raidPlan.name}</th>
              <th>Start: {raidPlan.start}</th>
              <th>Von: {raidPlan.createdFrom}</th>

              {canCancel && (
                <th>
                  <form>
                    <button className="delete-btn">X</button>
                  </form>
                </th>
              )}
            </tr>
          </thead>

          {/* raid entries */}
          {hasBody && (
            <tbody>
              <tr></tr>
            </tbody>
          )}
        </table>
      ))}
    </>
  );
};
