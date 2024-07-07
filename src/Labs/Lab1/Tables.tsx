export default function Tables() {
    return (
        <div id="wd-tables">
            <h4>Table Tag</h4>
            <table border={1} width="100%">
                <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="center">Q1</td>
                        <td align="center">HTML</td>
                        <td align="center">2/3/21</td>
                        <td align="center">90</td>
                    </tr>
                    <tr>
                        <td align="center">Q2</td>
                        <td align="center">CSS</td>
                        <td align="center">2/10/21</td>
                        <td align="center">90</td>
                    </tr>
                    <tr>
                        <td align="center">Q3</td>
                        <td align="center">JavaScript</td>
                        <td align="center">2/17/21</td>
                        <td align="center">95</td>
                    </tr>
                    <tr>
                        <td align="center">Q4</td>
                        <td align="center">Routing</td>
                        <td align="center">2/24/21</td>
                        <td align="center">90</td>
                    </tr>
                    <tr>
                        <td align="center">Q5</td>
                        <td align="center">State & Redux</td>
                        <td align="center">2/31/21</td>
                        <td align="center">99</td>
                    </tr>
                    <tr>
                        <td align="center">Q6</td>
                        <td align="center">Session</td>
                        <td align="center">3/7/21</td>
                        <td align="center">92</td>
                    </tr>
                    <tr>
                        <td align="center">Q7</td>
                        <td align="center">MongoDB</td>
                        <td align="center">3/14/21</td>
                        <td align="center">96</td>
                    </tr>
                    <tr>
                        <td align="center">Q8</td>
                        <td align="center">Mongoose</td>
                        <td align="center">3/21/21</td>
                        <td align="center">98</td>
                    </tr>
                    <tr>
                        <td align="center">Q9</td>
                        <td align="center">APIs</td>
                        <td align="center">3/28/21</td>
                        <td align="center">100</td>
                    </tr>
                    <tr>
                        <td align="center">Q10</td>
                        <td align="center">AI</td>
                        <td align="center">4/5/21</td>
                        <td align="center">100</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td align="center" colSpan={3}>Average</td>
                        <td align="center">95</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}