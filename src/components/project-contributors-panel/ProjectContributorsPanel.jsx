import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import AvatarGroup from "@mui/material/AvatarGroup";
import AvatarComponent from "../avatar/Avatar";
import Button from "../buttons/Button"

function ProjectContributorsPanel(props) {
  const contributors = props.contributors;
  const contibutorsAvatars = contributors.map((contributor, idx) => {});
  console.log(contributors);
  return (
    <Box>
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
                  {contributor.title}
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--color4)" }}>
                  {contributor.available_slots}{" "}
                </TableCell>
                <TableCell align="left" >
                  {contributor.contributors.map((user, idx) => {
                    if (user.state === "accepted") {
                      return (
                        <AvatarGroup max={4} spacing={"small"} key={idx} sx={{flexDirection: "row"}}>
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
                    <Button variant={"outlined"} category={"action"} title={"See more"} />
                    <Button variant={"contained"} category={"action"} title={"Apply"} />
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