import { Button, Collapse } from "@mui/material";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

//home page
function Home() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true); //title animation
  }, []);
  return (
    <header className="header">
      <>
        <img
          className="headerImage"
          src="https://firebasestorage.googleapis.com/v0/b/blog-app-a46d7.appspot.com/o/Background%2FBlog%20home.png?alt=media&token=a91f086c-3629-412f-aeed-12d28869e102"
          alt="background_image"
        ></img>
      </>
      <br />
      <div className="headerTitle">
        {/* title animation */}
        <Collapse in={checked} {...(checked ? { timeout: 2000 } : {})}>
          <h5>
            Welcome to... <br />
            <span className="headerSpan">Blogging world</span>
          </h5>
          <div className="headerBtn">
            <Button
              style={{
                fontSize: 14,
                borderRadius: "10px",
                outline: "none",
                border: "none",
              }}
              onClick={() => {
                history.push("/blog");
              }}
              variant="contained"
              color="warning"
            >
              View Blogs
            </Button>
          </div>
        </Collapse>
      </div>
    </header>
  );
}

export default Home;
