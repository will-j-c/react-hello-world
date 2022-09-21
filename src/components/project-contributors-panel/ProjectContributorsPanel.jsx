import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import AvatarGroup from "@mui/material/AvatarGroup";
import AvatarComponent from "../avatar/Avatar";
import Button from "../buttons/Button";

import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import LoginModal from '../modals/LoginModal';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ContributorRow from "./ContributorRow";

function ProjectContributorsPanel(props) {
  const params = useParams();
  const { auth } = useContext(AuthContext);
  const [ loginModalIsOpen, setLoginModalIsOpen ] = useState(false);
  const { contributors, creator, updateContributors } = props;
  const axiosPrivate = useAxiosPrivate();

  const handleApply = async function(contributorID) {
    try {
      if (!auth.username) {
        setLoginModalIsOpen(true);
        return;
      }
      await axiosPrivate.post(`/contributors/${contributorID}/apply`);
      updateContributors();
    } catch (err) {}
  }

  const handleWithdraw = async function(contributorID) {
    try {
      await axiosPrivate.delete(`/contributors/${contributorID}/withdraw`);
      updateContributors();
    } catch (err) {}
  }

  return (
    <Box>
      {auth.username === creator.username && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginY={3}
        >
          <Button
            category={"action"}
            title={"Add new contributor"}
            variant={"outlined"}
            route={`/projects/${params.slug}/contributors/create`}
          />
        </Box>
      )}

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ color: "var(--color4)" }}>
                Contributor
              </TableCell>
              <TableCell align="center" sx={{ color: "var(--color4)" }}>
                Available
              </TableCell>
              <TableCell align="left" sx={{ color: "var(--color4)" }}>
                Filled by
              </TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ color: "var(--color4)" }}
              >
                <Button
                  variant={"contained"}
                  category={"category"}
                  title={"Creator"}
                />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ color: "var(--color4)" }}
                align="center"
              >
                1
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ color: "var(--color4)" }}
              >
                <AvatarGroup
                  max={4}
                  spacing={"small"}
                  sx={{ flexDirection: "row" }}
                >
                  <AvatarComponent
                    imgAlt={creator.username}
                    imgUrl={creator.profile_pic_url}
                  />
                </AvatarGroup>
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ color: "var(--color4)" }}
              >
              </TableCell>
            </TableRow>
            {contributors.map((contributor) => {
              const applicants = contributor.contributors;
              const isApplied = applicants.filter(a => a.user.username === auth?.username);
              const status = isApplied.length > 0 ? isApplied[0].state : 'not applied';
              return (
                <ContributorRow 
                  key={contributor.title}
                  contributor={contributor}
                  creator={creator}
                  status={status}
                  handleApply={handleApply}
                  handleWithdraw={handleWithdraw}
                  triggerLogin={() => setLoginModalIsOpen(true)}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <LoginModal 
        isOpen={loginModalIsOpen} 
        onClose={() => setLoginModalIsOpen(false)}
      />
    </Box>
  );
}

export default ProjectContributorsPanel;
