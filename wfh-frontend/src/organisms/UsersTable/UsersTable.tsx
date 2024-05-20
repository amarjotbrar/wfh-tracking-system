import { Table, Button } from "rsuite"
const { Column, HeaderCell, Cell } = Table;

import { UserTableProps } from "./types";
import styles from './UsersTable.module.scss'

function UsersTable({data, handleAdminClick}: UserTableProps) {
  return (
    <>
        <Table className={styles.userTable} data={data} fillHeight style={{width:"100%"}}>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Email ID</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>First Name</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Last Name</HeaderCell>
                    <Cell dataKey="lastName" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>User Type</HeaderCell>
                    <Cell>
                      {(rowData) => (
                        rowData.isAdmin ? (<p>Admin User</p>) : (
                          
                        <Button className={styles.adminButton} appearance="primary" color="green"
                          onClick={() => handleAdminClick(rowData._id)}
                          >
                          Make Admin
                        </Button>
                        )
                      )}
                    </Cell>
                </Column>
            </Table>
    </>
  )
}

export default UsersTable