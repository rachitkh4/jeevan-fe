import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Class, Search as SearchIcon } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

const TableComponentWrapper = styled("div")(({ theme }) => ({
  "&": {
    border: `1px solid ${theme.palette.primaryGrey}`,
    backgroundColor: theme?.palette?.primaryWhite,
  },
  ".search-wrap": {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4.5),
  },
  ".linkTypography": {
    "&.MuiTypography-root": theme.typography.link,
    cursor: "pointer",
  },
  ".table-body-container": {
    "&.MuiTableBody-root": {
      backgroundColor: theme.palette.primaryWhite,
    },
  },
  ".table-component-wrapper": {},
  ".table-component-header": {
    "&.MuiTableHead-root": {
      backgroundColor: theme.palette.primaryOpacityBlue,
    },
  },
}));

const MyTable = ({
  columns,
  data,
  showSearch = true,
  tableStyle,
  tableClassName,
  searchClassName,
  onRowClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data?.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return columns.some((column) =>
      item[column.key]?.toString()?.toLowerCase()?.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <TableComponentWrapper>
      {showSearch && (
        <div className="search-wrap">
          <TextField
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              ),
            }}
            value={searchTerm}
            onChange={handleSearch}
            className={searchClassName}
          />
        </div>
      )}
      <TableContainer
        component={Paper}
        style={tableStyle}
        className={tableClassName}
      >
        <Table className="table-component-wrapper">
          <TableHead className="table-component-header">
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={column.key} classNamwe="table-header-cell">
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="table-body-container">
            {filteredData?.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns?.map((column) => {
                  if (column.key !== "actions") {
                    return (
                      <TableCell key={`${item?.id}-${column?.key}`}>
                        {column?.render
                          ? column?.render(item[column?.key])
                          : item[column.key]}
                      </TableCell>
                    );
                  } else {
                    const actions = column.actions || [];
                    return (
                      <TableCell key={`${item.id}-${column.key}`} align="right">
                        {actions?.map((action, index) => {
                          if (action?.type === "icon") {
                            return (
                              <IconButton
                                key={index}
                                size="small"
                                onClick={() => action?.onClick(item)}
                              >
                                {action.icon}
                              </IconButton>
                            );
                          } else if (action?.type === "link") {
                            return (
                              <Typography
                                key={index}
                                size="small"
                                onClick={() => action.onClick(item)}
                                className="linkTypography"
                              >
                                {action?.key
                                  ? column[action?.key]
                                  : action?.link}
                              </Typography>
                            );
                          }
                        })}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableComponentWrapper>
  );
};

export default MyTable;
