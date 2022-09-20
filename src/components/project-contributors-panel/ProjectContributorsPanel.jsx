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
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

function ProjectContributorsPanel(props) {
  const { contributors, creator } = props;
  return (
    <Box>
      {auth.username === props.creator.username && (
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
            </TableRow>
            {contributors.map((contributor) => (
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
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Button
                      variant={"outlined"}
                      category={"action"}
                      title={"See more"}
                    />
                    <Button
                      variant={"contained"}
                      category={"action"}
                      title={"Apply"}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProjectContributorsPanel;
