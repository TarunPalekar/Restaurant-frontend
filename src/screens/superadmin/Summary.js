import Chart from "../../components/DashboardComponent/Chart"
import Deposits from "../../components/Deposits"
import DepositeTable from "../../components/DepositeTable"
import { Grid,Paper } from "@mui/material"
import Title from "../../components/Title"
export default function Summary(props)
{
  return(<div>
    {/* Chart */}
    <Grid container spacing={3}>
    <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 250,
                    overflowY:''
                  }}
                >
                
                  <DepositeTable />
                </Paper>
              </Grid>
          </Grid>    

  </div>)

}