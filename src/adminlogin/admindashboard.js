import { useState } from "react";
import {
    Avatar,
    Paper,
    Grid,
    AppBar,
    Toolbar,
    Box,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import RestaurantInterface from "../screens/restaurant/restaurantInterface";
import DisplayAllRestaurant from "../screens/restaurant/DisplayAllRestaurant";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postData, serverURL,getData } from "../services/fetchNodeServices";
const useStyles = makeStyles({

    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    leftBarStyle: {
        padding: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    nameStyle: {
        fontFamily: "Kanit",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 2,
    },
    phoneStyle: {
        fontFamily: "Kanit",
        fontSize: 12,
        fontWeight: "bold",

        color: "#636e72",
    },
    emailStyle: {
        fontFamily: "Kanit",
        fontSize: 12,
        fontWeight: "bold",

        color: "#636e72",
    },
    menuStyle: {
        fontFamily: "Kanit",
        fontSize: 18,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "left",
        width: 250,
    },
    menuItemStyle: {
        fontFamily: "Kanit",
        fontSize: 16,
        fontWeight: "bold",
    },
});
export default function AdminDashboard(props) {
    var classes = useStyles();
    var navigate = useNavigate();
    var admin = JSON.parse(localStorage.getItem("ADMIN"));
    const handleLogout = () => {
        localStorage.clear();
        navigate("/adminlogin");
    };
    return (
        <Box >
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Super Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spaces={3}>
                <Grid item xs={2} style={{ marginTop: 50 }}>
                    <Paper className={classes.leftBarStyle}>
                        <Avatar
                            src={`${serverURL}/images/${admin.picture}`}
                            variant="circular"
                            style={{ width: 80, height: 80 }}
                        />
                        <div className={classes.nameStyle}></div>
                        <div className={classes.emailStyle}></div>
                        <div className={classes.phoneStyle}>+919301123085</div>

                        <div className={classes.menuStyle}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => navigate("/admindashboard/restaurantinterface")}
                                    >
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <span className={classes.menuItemStyle}>
                                                    Add restaurant
                                                </span>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>

                                

                                <Divider variant="inset" />

                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <span className={classes.menuItemStyle}>Logout</span>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </div>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={10}
                    style={{ padding: 25, background: "#dfe4ea", height: "auto" }}
                >
                    <Routes>
                        <Route
                            element={<RestaurantInterface />}
                            path="/restaurantinterface"
                        />
                        <Route
                            element={<DisplayAllRestaurant />}
                            path="/displayallrestaurant"
                        />
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    );
}
