import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../css/styles.css";
import problemSolving from "../images/problem-solving.png";
import Funding from "./Funding";

class Intro extends Component {
  render() {
    return (
      <>
        
        <section className="intro">
          <Container>
            <span className="dot"></span>
            <h4 className="dot-words">
              CSE 199 -
              <br />
              Impossible Project [IP]:
              <p>Making Computing Anti-Racist</p>
            </h4>
            {/* <img className="iplogo" src={iplogo} alt="iplogo"></img> */}
          </Container>
        </section>
        <section className="intro2">
          <Container>
            <span className="dot2"></span>
            <h5 className="dot-words2">Nurturing Critical Imaging</h5>
            <img
              className="problem-solving"
              src={problemSolving}
              alt="problem-solving"
            ></img>
            <p className="nurturing-para">
              CSE 199 IP students were challenged to learn how to think
              <br />
              critically and creatively as they approached the complex problem
              <br />
              they were tasked with. We often subordinate the role of creativity
              <br />
              when we teach problem solving to our students. However, we cannot
              <br />
              create a just future unless we are capable of imagining it.
            </p>
          </Container>

          <span className="dot3"></span>
          <h5 className="dot-words3">Enhancing True Collaboration</h5>
          <p className="collaboration-para">
            CSE 199 IP students worked together to co-create solutions to the
            <br />
            complex problems surrounding race and computing technology
            <br />
            collaboratively. The data on these pages reflects collaborative
            <br />
            solutions -building only. Learning to work collaboratively in a
            <br />
            “high stakes” environment is a valuable life lesson and professional
            <br />
            development experience for our students. Solving our most complex
            <br />
            global problems will require high-level, multi-faceted
            collaboration.
          </p>

          <span className="dot4"></span>
          <h5 className="dot-words4">Building Collective Resilience</h5>
          <p className="collective-para">
            CSE 199 IP students worked together toward solving a problem they
            <br />
            could not solve within the limited timeframe provided and with the
            <br />
            limited expertise they had. Even under these constraints, however,
            <br />
            students moved forward using the resources they were given to frame
            <br />
            the solutions you see. We must prepare our students to be resilient
            <br />
            together in the face of problems of overwhelming scale and scope.
            <br />
            Proof of the CSE 199 IP students’ success is encoded in these pages.
            <br />
            Take a look and imagine what they will be able to do in the future
            <br />
            as professionals.
          </p>

          <span className="dot5"></span>
          <h5 className="dot-words5">
            Discovering Purpose
            <br />
            Through Justice Work
          </h5>
          <p className="discovering-para">
            By not only doing but sharing their problem-solving work, students
            <br />
            in the CSE 199 IP took their learning outside of the classroom and
            <br />
            are sharing it with the world. Students in the project will have the
            <br />
            opportunity to do deeper research on the most creative of the
            <br />
            solutions here presented, thus deepening not only their thinking but
            <br />
            their engagement in computing for social good. We hope that this
            <br />
            experience will attune our students to the importance of working
            <br />
            toward social good and empower them to do so.
          </p>
        </section>
        <Funding />
      </>
    );
  }
}

export default Intro;
