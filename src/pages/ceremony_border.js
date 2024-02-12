import React, { useRef, useState, useEffect } from "react";
import { graphql, Link, useScrollRestoration } from "gatsby";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { DateTime } from "luxon";
// import Icon2 from "../../assets/TFCMLogo.svg";
const PageCon = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  @media (max-width: 666px) {
    height: auto;
  }
`;

/* - - - - - GRID  - - - - - - */
const Grid16 = styled.div`
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;

  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;
const Grid16Border = styled.div`
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  border-top: 0.5px solid #eaeaea;
  padding-top: 1.5px;
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

/* - - - - - MAIN SECTIONS  - - - - - - */
const LogoConCon = styled.div`
  /* margin-top: 12.5px; */
  position: absolute;
  @media (max-width: 666px) {
    /* margin-top: 10px; */
  }
`;

const InviteCon = styled.div`
  position: absolute;
  padding-top: 30vh;
  width: 100vw;
  /* background-color: red; */
`;

const InviteCopyCon = styled.div`
  grid-column: span 16;
`;

const TimeLocationCon = styled.div`
  position: absolute;
  padding-top: 60vh;
  width: 100vw;
  @media (max-width: 666px) {
    padding-top: 60vh;
  }
`;

const CermonyCon = styled.div`
  grid-column: span 8;
  @media (max-width: 666px) {
    grid-column: span 16;
  }
`;
const ReceptionCon = styled.div`
  grid-column: span 8;
  @media (max-width: 666px) {
    grid-column: span 16;
    margin-top: 10vh;
    /* padding-top: 12.5px; */
    border-top: 0.5px solid #eaeaea;
  }
`;
const LoveCon = styled.div`
  position: fixed;
  bottom: 12.5px;
  width: 100%;
  @media (max-width: 666px) {
    position: relative;
    margin-top: 120vh;
  }
`;
const LoveTextCon = styled.div`
  grid-column: span 11;
`;
const CopyRightDestopCon = styled.div`
  margin-top: 12.5px;
  grid-column: span 4;
  @media (max-width: 666px) {
    display: none;
  }
`;

const MobileFooterCon = styled.div`
  margin-top: 60px;
  @media (min-width: 666px) {
    display: none;
  }
`;

const MobileFooterCol1 = styled.div`
  grid-column: span 8;
`;

const MobileFooterCol2 = styled.div`
  grid-column: span 8;
`;

const MobileCopyRightCon = styled.div`
  @media (min-width: 666px) {
    display: none;
  }
`;

/* - - - - - - CONTENT - - - - - */
const LogoCon = styled.div`
  padding-top: 12.5px;
  grid-column: span 7;
  opacity: 0.6;
  /* background-color: red; */
  width: calc(100%);
  /* height: 200px; */
  svg {
    width: 100%;
  }
  @media (max-width: 666px) {
    grid-column: span 12;
  }
`;
const UKTimeCon = styled.div`
  margin-top: 12.5px;
  grid-column: 12 / span 2;
  @media (max-width: 666px) {
    display: none;
  }
`;

const LATimeCon = styled.div`
  margin-top: 12.5px;
  grid-column: 14 / span 2;
  @media (max-width: 666px) {
    display: none;
  }
`;
const SecondDate = styled.div`
  padding-top: 1.5vh;
`;

const Text = styled.p`
  font-family: "HelveticaNowText";
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  line-height: 110%;
  letter-spacing: -1.7px;
  color: #e0e0e0;
  opacity: 0.6;
  @media (max-width: 666px) {
    font-size: 24px;
  }
`;

const Text2 = styled.p`
  font-family: "HelveticaNowText";
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  line-height: 110%;
  letter-spacing: -1.2px;
  color: #e0e0e0;
  opacity: 0.6;
  @media (max-width: 666px) {
    font-size: 16px;
  }
`;

const Index = ({ data }) => {
  const [gmtTimeState, setGmtTimeState] = React.useState(gmtTime);

  // console.log(date());
  var la = DateTime.now()
    .setZone("America/Los_Angeles")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");
  var laDate = DateTime.now()
    .setZone("America/Los_Angeles")
    .toFormat("y'/'LL'/'dd");
  var laTime = DateTime.now()
    .setZone("America/Los_Angeles")
    .toFormat("HH':'mm':'ss");

  var gmt = DateTime.now()
    .setZone("Europe/London")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");

  var gmtDate = DateTime.now()
    .setZone("Europe/London")
    .toFormat("y'/'LL'/'dd");

  var gmtTime = DateTime.now()
    .setZone("Europe/London")
    .toFormat("HH':'mm':'ss");

  var est = DateTime.now()
    .setZone("America/New_York")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");

  var estDate = DateTime.now()
    .setZone("America/New_York")
    .toFormat("y'/'LL'/'dd");

  var estTime = DateTime.now()
    .setZone("America/New_York")
    .toFormat("HH':'mm':'ss");

  var ist = DateTime.now()
    .plus({ hours: 5, minutes: 20 })
    // .defaultZone("utc")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");

  var istDate = DateTime.now()
    .plus({ hours: 5, minutes: 20 })
    .toFormat("y'/'LL'/'dd");

  var istTime = DateTime.now()
    .plus({ hours: 5, minutes: 20 })
    .toFormat("HH':'mm':'ss");

  function date() {}

  // console.log(date());

  useEffect(() => {
    setInterval(() => {
      setGmtTimeState(gmtTime);
    }, 1000);
  }, []);

  return (
    <>
      <Helmet>
        <title>TFCM – 08/06/24 – Ceremony</title>
      </Helmet>
      <PageCon>
        <LogoConCon>
          <Grid16>
            <LogoCon>
              <StaticImage src={"../img/TFCM Logo C.svg"} />
            </LogoCon>
            <UKTimeCon>
              <Text2>
                GMT <br></br>
                {gmtDate}
                <br></br>
                {gmtTime}
                <br></br>
                <SecondDate>
                  EST<br></br>
                  {estDate}
                  <br></br>
                  {estTime}
                </SecondDate>
              </Text2>
            </UKTimeCon>
            <LATimeCon>
              <Text2>
                PST <br></br>
                {laDate}
                <br></br>
                {laTime}
                <SecondDate>
                  IST <br></br>
                  {istDate}
                  <br></br>
                  {istTime}
                </SecondDate>
              </Text2>
            </LATimeCon>
          </Grid16>
        </LogoConCon>

        <InviteCon>
          <Grid16Border>
            <InviteCopyCon>
              <Text>
                Theo & Cat invite you to their first project together - getting
                married.
                <br></br>
                <br></br>
                08/06/2024
              </Text>
            </InviteCopyCon>
          </Grid16Border>
        </InviteCon>
        <TimeLocationCon>
          <Grid16Border>
            <CermonyCon>
              <Text>
                15:40<br></br>
                Southwark Register Office <br></br>
                34 Peckham Rd, London SE5 8QA<br></br>* We'll be in the Hermits
                Cave<br></br> from 15:00 feel free to join us
              </Text>
            </CermonyCon>
            <ReceptionCon>
              <Text>
                17:00<br></br>
                Camberweel Arms <br></br>
                65 Camberwell Church St<br></br>
                London SE5 8TR
              </Text>
            </ReceptionCon>
          </Grid16Border>
        </TimeLocationCon>
        <LoveCon>
          <Grid16Border>
            <LoveTextCon>
              <Text>
                Love<br></br>Cat & Theo
              </Text>
            </LoveTextCon>
            <CopyRightDestopCon>
              <Text2>
                {" "}
                &copy; All rights reserved TFCM. <br></br>
                TFCM-0001
              </Text2>
            </CopyRightDestopCon>
          </Grid16Border>
        </LoveCon>
        <MobileFooterCon>
          <Grid16Border>
            <MobileFooterCol1>
              <Text2>
                GMT <br></br>
                {gmtDate}
                <br></br>
                {gmtTime}
                <br></br>
                <br></br>
                EST<br></br>
                {estDate}
                <br></br>
                {estTime}
                <br></br>
                <br></br>
                <br></br>
              </Text2>
            </MobileFooterCol1>
            <MobileFooterCol2>
              <Text2>
                PST <br></br>
                {laDate}
                <br></br>
                {laTime}
                <br></br>
                <br></br>
                IST <br></br>
                {istDate}
                <br></br>
                {istTime}
                <br></br>
                <br></br>
                <br></br>
              </Text2>
            </MobileFooterCol2>
          </Grid16Border>
        </MobileFooterCon>
        <MobileCopyRightCon>
          <Grid16Border>
            <MobileFooterCol1>
              <Text2>TFCM-0001</Text2>
            </MobileFooterCol1>
            <MobileFooterCol2>
              <Text2>&copy; All rights reserved TFCM.</Text2>
            </MobileFooterCol2>
          </Grid16Border>
        </MobileCopyRightCon>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(Index);
