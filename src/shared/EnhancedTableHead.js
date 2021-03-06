import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Box,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
  tableSortLabel: {
    cursor: "text",
    userSelect: "auto",
    color: "inherit !important"
  },
  noPointerEvents: {
    pointerEvents: "none"
  },
  paddingFix: {
    paddingLeft: theme.spacing(3)
  }
});

function EnhancedTableHead(props) {
  const { order, orderBy, rows, onRequestSort, classes } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {rows.map((row, index) => (
          <TableCell
            key={index}
            align={row.numeric ? "right" : "inherit"}
            padding="default"
            sortDirection={orderBy === row.name ? order : false}
            className={index === 0 ? classes.paddingFix : null}
          >
            {onRequestSort ? (
              <Tooltip
                title="Sort"
                placement={row.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  <Typography variant="body2">{row.label}</Typography>
                </TableSortLabel>
              </Tooltip>
            ) : (
              <TableSortLabel
                className={classNames(
                  classes.tableSortLabel,
                  classes.noPointerEvents
                )}
              >
                <Typography variant="body2" className={classes.label}>
                  {row.label}
                </Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  rows: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(EnhancedTableHead);
