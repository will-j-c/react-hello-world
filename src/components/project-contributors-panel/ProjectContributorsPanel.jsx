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

function ProjectContributorsPanel(props) {
  const params = useParams();
  const { auth } = useContext(AuthContext);
  const [ loginModalIsOpen, setLoginModalIsOpen ] = useState(false);
  const { contributors, creator } = props;
  console.log(`contributors: ${JSON.stringify(contributors)}`);
  const axiosPrivate = useAxiosPrivate();

  const handleAction = async function() {
    try {
      if (!auth.username) {
        setLoginModalIsOpen(true);
        return;
      }
      // if (status === 'not applied') {
      //   await axiosPrivate.post(`/contributors/${contributor?._id}/apply`);
      //   setStatus('applied');
      // } else if (status === 'applied') {
      //   await axiosPrivate.delete(`/contributors/${contributor?._id}/withdraw`);
      //   setStatus('not applied');
      // }
      return

    } catch (err) {
    }
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
              console.log(`status: ${status}`);
              return (
                <TableRow
                  key={contributor.title}
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
                      title={contributor.title}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: "var(--color4)" }}>
                    {contributor.available_slots}
                  </TableCell>
                  <TableCell align="left">
                    {contributor.contributors.map((user, idx) => {
                      if (user.state === "accepted") {
                        return (
                          <AvatarGroup
                            max={4}
                            spacing={"small"}
                            key={idx}
                            sx={{ flexDirection: "row" }}
                          >
                            <AvatarComponent
                              imgAlt={user.user.username}
                              imgUrl={user.user.profile_pic_url}
                            />
                          </AvatarGroup>
                        );
                      }
                    })}
                  </TableCell>
                  
                  <TableCell>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                      <Button
                        variant={"outlined"}
                        category={"action"}
                        title={"View"}
                        route={`/contributors/${contributor.id}`}
                      />
                      {(auth.username !== creator.username 
                        && status === 'not applied'
                      ) && (
                        <Button
                          variant={"contained"}
                          category={"action"}
                          title={"Apply"}
                          onClick={handleAction}
                        />
                      )}
                      {(auth.username !== creator.username 
                        && ( status === 'accepted' || status === 'rejected' )
                      ) && (
                        <Button
                          variant={"outlined"}
                          category={"status"}
                          title={status.charAt(0).toUpperCase() + status.slice(1)}
                        />
                      )}
                      {(auth.username !== creator.username 
                        && ( status === 'applied' )
                      ) && (
                        <Button
                          variant={"outlined"}
                          category={"action"}
                          title={status.charAt(0).toUpperCase() + status.slice(1)}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
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
