import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import AuthContext from "../../context/AuthProvider";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import Button from "../buttons/Button";
import AvatarGroup from "@mui/material/AvatarGroup";
import AvatarComponent from "../avatar/Avatar";

export default function ContributorRow(props) {
  const { contributor, creator, status, handleApply, handleWithdraw } = props;
  const { title, available_slots, contributors } = contributor;
  const { auth } = useContext(AuthContext);
  const [ appliedButtonTitle, setAppliedButtonTitle ] = useState('Applied');

  const acceptances = contributors.filter(user => user.state === 'accepted');
  const availability = Math.max(available_slots - acceptances.length, 0);

  const handleMouseOver = function() {
    if (appliedButtonTitle === 'Applied') {
      setAppliedButtonTitle('Withdraw');
    }
  }

  const handleMouseLeave = function() {
    if (appliedButtonTitle === 'Withdraw') {
      setAppliedButtonTitle('Applied');
    }
  }
  
  return (
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
          title={title}
        />
      </TableCell>
      
      <TableCell align="center" sx={{ color: "var(--color4)" }}>
        {availability}
      </TableCell>
      <TableCell align="left">
        {contributors.map((user, idx) => {
          if (user.state === "accepted") {
            return (
              <AvatarGroup
                max={4}
                spacing={"small"}
                key={idx}
                sx={{ flexDirection: "row" }}
              >
                <Link to={`/users/${user.user.username}`}>
                <AvatarComponent
                  imgAlt={user.user.username}
                  imgUrl={user.user.profile_pic_url}
                />
                </Link>
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
            route={`/contributors/${contributor._id}`}
          />
          {(availability > 0 && (!auth.username || 
            (auth.username !== creator.username && status === 'not applied')
          )) && (
            <Button
              variant={"contained"}
              category={"action"}
              title={"Apply"}
              onClick={() => handleApply(contributor._id)}
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
              title={appliedButtonTitle}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleWithdraw(contributor._id)}
            />
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}
