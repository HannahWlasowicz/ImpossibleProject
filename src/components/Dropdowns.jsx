import React, { useState, useEffect } from "react";
import { Container, Dropdown } from "react-bootstrap";
import keywords from "../json/keywords.json";
import responses from "../json/responses.json";
import "../css/table.css";
import "../css/styles.css";
import Root from "./Root";

const Dropdowns = () => {
  const [keys, setKeys] = useState(keywords);
  const [response, setResponse] = useState(responses);
  const [questions, setAnswers] = useState([]);

  useEffect(() => [questions]);

  function getResponse(){
    return response;
  }

  function updateAnser(answerArray){
    setAnswers(answerArray);
  }


  const historicalWords = keys[0]["historical_table"].map((obj) => (
    <Dropdown.Item onClick={() => updates(obj.key)}>{obj.key}</Dropdown.Item>
  ));
  const structuralWords = keys[0]["structural_table"].map((obj) => (
    <Dropdown.Item onClick={() => updates(obj.key)}>{obj.key}</Dropdown.Item>
  ));
  const peopleWords = keys[0]["people_table"].map((obj) => (
    <Dropdown.Item onClick={() => updates(obj.key)}>{obj.key}</Dropdown.Item>
  ));
  const technologicalWords = keys[0]["technological_table"].map((obj) => (
    <Dropdown.Item onClick={() => updates(obj.key)}>{obj.key}</Dropdown.Item>
  ));

  return (
    <div>
        {/* <section>
            <Root/>
        </section> */}
      <section>
        <Container className="flex-container">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Historical Words
            </Dropdown.Toggle>
            <Dropdown.Menu>{historicalWords}</Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Structural Words
            </Dropdown.Toggle>
            <Dropdown.Menu>{structuralWords}</Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              People Words
            </Dropdown.Toggle>
            <Dropdown.Menu>{peopleWords}</Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              Technological Words
            </Dropdown.Toggle>
            <Dropdown.Menu>{technologicalWords}</Dropdown.Menu>
          </Dropdown>
        </Container>
        {/* Table container goes below */}

        <Container>
          <div className="app-container table-container container">
            <table>
              <thead>
                <tr>
                  <th>Responses</th>
                </tr>
              </thead>
              {questions.map((answ) => (
                <tr>{answ}</tr>
              ))}
              <tbody></tbody>
            </table>
          </div>
        </Container>
      </section>
    </div>
  );
};

export function updates(key) {
  console.log("cool");
  let answerArray = [];
  
  let resVal =this.getResponse();
  for (const element of resVal[key]) {
    element.raw_text.includes(key)
      ? answerExtraction(element, answerArray)
      : console.log();
  }
  this.updateAnser(answerArray);
}

function answerExtraction(object, answerArray) {
  if (object.question === "history") {
    answerArray.push(<td className="history"> {object.raw_text} </td>);
  } else if (object.question === "people") {
    answerArray.push(<td className="people"> {object.raw_text} </td>);
  } else if (object.question === "structure") {
    answerArray.push(<td className="structure"> {object.raw_text} </td>);
  } else {
    answerArray.push(<td className="tech"> {object.raw_text} </td>);
  }
}

export default Dropdowns;
