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
  border-top: 0.5px solid #e4e3e3;
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
    position: fixed;
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
    padding-top: 55vh;
  }
`;
const ProjectNumCon = styled.div`
  grid-column: 9 / span 2;
  margin-top: 12.5px;
  display: none;
  @media (max-width: 666px) {
    grid-column: 13 / span 4;
    p {
      font-size: 12px;
      float: right;
      letter-spacing: -0.2px;
    }
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
    padding-top: 5px;
    margin-top: 10vh;
    /* padding-top: 12.5px; */
    border-top: 0.5px solid #e4e3e3;
  }
`;

const MobileFooterCon = styled.div`
  width: 100vw;
  margin-top: 110vh;

  @media (min-width: 666px) {
    display: none;
  }
`;
const TimeZoneCon = styled.div`
  margin-top: 10vh;
`;
const ContactCon = styled.div`
  margin-top: 6vh;
`;

const MobileFooterCol1 = styled.div`
  padding-top: 5px;
  grid-column: span 8;
`;

const MobileFooterCol2 = styled.div`
  padding-top: 5px;
  grid-column: span 8;
`;

const DesktopFooterCon = styled.div`
  position: fixed;
  bottom: 12.5px;
  width: 100%;
  @media (max-width: 666px) {
    display: none;
  }
`;
const LoveTextCon = styled.div`
  grid-column: span 8;
  @media (max-width: 666px) {
    grid-column: span 16;
  }
`;
const ContactTextCon = styled.div`
  grid-column: span 2;
  padding-top: 5px;
  @media (max-width: 666px) {
    grid-column: span 8;
    margin-bottom: 10vh;
  }
`;
const RegistrationCon = styled.div`
  grid-column: span 4;
  padding-top: 5px;
  @media (max-width: 666px) {
    padding-top: 5px;
    grid-column: span 16;
  }
`;

/* - - - - - - CONTENT - - - - - */
const LogoCon = styled.div`
  padding-top: 12.5px;
  grid-column: span 5;
  opacity: 0.7;
  /* background-color: red; */
  width: calc(100%);
  /* height: 200px; */
  svg {
    width: 100%;
  }
  @media (max-width: 666px) {
    grid-column: span 8;
  }
`;
const UKTimeCon = styled.div`
  margin-top: 12.5px;
  grid-column: 9 / span 2;
  @media (max-width: 666px) {
    display: none;
  }
`;
const NYTimeCon = styled.div`
  margin-top: 12.5px;
  grid-column: 11 / span 2;
  @media (max-width: 666px) {
    display: none;
  }
`;

const LATimeCon = styled.div`
  margin-top: 12.5px;
  grid-column: 13 / span 2;
  @media (max-width: 666px) {
    display: none;
  }
`;
const INTimeCon = styled.div`
  margin-top: 12.5px;
  grid-column: 15 / span 2;
  @media (max-width: 666px) {
    display: none;
  }
`;

const SecondDate = styled.div`
  padding-top: 1.5vh;
`;

const Text = styled.p`
  font-family: "HelveticaNowText", helvetica;
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  line-height: 110%;
  letter-spacing: -1.7px;
  color: #e0e0e0;
  opacity: 0.7;
  @media (max-width: 666px) {
    font-size: 24px;
  }
`;

const Text2 = styled.p`
  font-family: "HelveticaNowText", helvetica;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  line-height: 110%;
  letter-spacing: -1.2px;
  color: #e0e0e0;
  opacity: 0.7;
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
    .toFormat("HH':'mm'");

  var gmt = DateTime.now()
    .setZone("Europe/London")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");

  var gmtDate = DateTime.now()
    .setZone("Europe/London")
    .toFormat("y'/'LL'/'dd");

  var gmtTime = DateTime.now()
    .setZone("Europe/London")
    .toFormat("HH':'mm'");

  var est = DateTime.now()
    .setZone("America/New_York")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");

  var estDate = DateTime.now()
    .setZone("America/New_York")
    .toFormat("y'/'LL'/'dd");

  var estTime = DateTime.now()
    .setZone("America/New_York")
    .toFormat("HH':'mm'");

  var ist = DateTime.now()
    .plus({ hours: 5, minutes: 20 })
    // .defaultZone("utc")
    .toFormat("y'/'LL'/'dd HH':'mm':'ss");

  var istDate = DateTime.now()
    .plus({ hours: 5, minutes: 20 })
    .toFormat("y'/'LL'/'dd");

  var istTime = DateTime.now()
    .plus({ hours: 5, minutes: 20 })
    .toFormat("HH':'mm'");

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
            <ProjectNumCon>
              <Text2>TFCM&#8212;0001</Text2>
            </ProjectNumCon>
            <UKTimeCon>
              <Text2>
                GMT<br></br>
                {gmtDate}
                <br></br>
                {gmtTime}
              </Text2>
            </UKTimeCon>
            <NYTimeCon>
              <Text2>
                EST<br></br>
                {estDate}
                <br></br>
                {estTime}
              </Text2>
            </NYTimeCon>
            <LATimeCon>
              <Text2>
                PST <br></br>
                {laDate}
                <br></br>
                {laTime}
              </Text2>
            </LATimeCon>
            <INTimeCon>
              <Text2>
                IST <br></br>
                {istDate}
                <br></br>
                {istTime}
              </Text2>
            </INTimeCon>
          </Grid16>
        </LogoConCon>

        <InviteCon>
          <Grid16Border>
            <InviteCopyCon>
              <Text>
                Theo & Cat invite you to their first project together &#8212;
                getting married
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
                The Garden Room<br></br>
                Southwark Register Office<br></br>
                34 Peckham Rd<br></br>
                London SE5 8QA
              </Text>
              {/* <Text2>
                * We'll be in the Hermits Cave from 15:00 feel free to join us
              </Text2> */}
            </CermonyCon>
            <ReceptionCon>
              <Text>
                17:00<br></br>
                Camberwell Arms <br></br>
                65 Camberwell Church St<br></br>
                London SE5 8TR
              </Text>
            </ReceptionCon>
          </Grid16Border>
        </TimeLocationCon>
        <DesktopFooterCon>
          <Grid16Border>
            <LoveTextCon>
              <Text>
                Love<br></br>Cat & Theo
              </Text>
            </LoveTextCon>
            <ContactTextCon>
              <Text2>
                cat.mollett@gmail.com<br></br>
                +44 7956 872 622
              </Text2>
            </ContactTextCon>
            <ContactTextCon>
              <Text2>
                Flat 14, Cam Court<br></br>
                Bibury Close<br></br>
                London SE15 6AG
              </Text2>
            </ContactTextCon>
            <RegistrationCon>
              <Text2>
                TFCM is a company registered in the England. Company No.
                077788012. Registered office: Flat 14, Cam Court, Bibury Close,
                SE15 6AG Vat Reg. Number: GB 821382322
              </Text2>
            </RegistrationCon>
          </Grid16Border>
        </DesktopFooterCon>

        <MobileFooterCon>
          <Grid16Border>
            <LoveTextCon>
              <Text>
                Love<br></br>Cat & Theo
              </Text>
            </LoveTextCon>
          </Grid16Border>
          <TimeZoneCon>
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
          </TimeZoneCon>
          <ContactCon>
            <Grid16Border>
              <ContactTextCon>
                <Text2>
                  theo.e.ford@gmail.com<br></br>
                  +44 7599 759 527
                </Text2>
              </ContactTextCon>
              <ContactTextCon>
                <Text2>
                  Flat 14, Cam Court<br></br>
                  Bibury Close<br></br>
                  London SE15 6AG
                </Text2>
              </ContactTextCon>
            </Grid16Border>
          </ContactCon>

          <Grid16Border>
            <RegistrationCon>
              <Text2>
                TFCM is a company registered in the England. Company No.
                077788012. Registered office: Flat 14, Cam Court, Bibury Close,
                SE15 6AG Vat Reg. Number: GB 821382322
              </Text2>
            </RegistrationCon>
          </Grid16Border>
        </MobileFooterCon>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(Index);
