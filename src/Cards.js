import {
  Card,
  Container,
  Grid,
  Box,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

const Cards = () => {
  const [pdata, setPdata] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const callPhotos = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=9&_page=${page}`
    );
    const data = await res.json();
    //adding the new data and spreading the prev
    setPdata((prev) => [...prev, ...data]);
    //assigning setTimeout to loading false so that loading will show for some more time
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleScroll = async () => {
    console.log("scroll top", document.documentElement.scrollTop);
    console.log("Window inner height", window.innerHeight);
    console.log("Window scroll height", document.documentElement.scrollHeight);

    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callPhotos();
  }, [page]);

  //calls scroll function on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    //remove the scroll func once we are done scrolling
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <h2> Let's learn Infinte Scrolling Effect</h2>
      <Grid display="flex" flexWrap="wrap" gap={3} mx={12}>
        {pdata.map((item) => (
          <Card
            sx={{
              height: 200,
              width: 280,
              pt: 8,
            }}
            key={item.id}
          >
            <Box>{item.id}</Box>
            <CardContent>{item.title}</CardContent>
          </Card>
        ))}
      </Grid>
      {loading && <CircularProgress />}
    </Container>
  );
};

export default Cards;
