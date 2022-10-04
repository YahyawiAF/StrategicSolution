import {
  useState,
  useRef,
  FC,
  useCallback,
  ReactNode,
  ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Menu,
  ListItemText,
  ListItem,
  List,
  Typography,
  TextField,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";

import {
  FilterAltSharp,
  ContentCopy,
  Print,
  AddCircleTwoTone,
  Search,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";

import { ReactComponent as FilterIcon } from "~/assets/icons/filter.svg";
import { ReactComponent as ActivateIcon } from "~/assets/icons/activate.svg";
import { ReactComponent as LinesIcon } from "~/assets/icons/lines.svg";
import { ReactComponent as PinIcon } from "~/assets/icons/pin.svg";
import { ReactComponent as CopyIcon } from "~/assets/icons/copy.svg";
import { ReactComponent as PrinterIcon } from "~/assets/icons/printer.svg";
import { ReactComponent as AddIcon } from "~/assets/icons/add.svg";

const IconCustomButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => (
  <IconButton color="primary" onClick={onClick} sx={{ ml: 1, p: 1 }}>
    {children}
  </IconButton>
);

IconCustomButton.displayName = "IconCustomButton";

interface IBulkActions {
  onHandleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  AddItemAction: () => void;
  title: string;
}

const CustomTextField = styled(TextField)(
  () => `
    && {
      box-shadow: unset;
      border-radius:0;
      .MuiInputBase-root {
        border-radius: 0;
        input {
          padding: 7.5px 10px;
        }
      }
    }
`
);

const BulkActions: FC<IBulkActions> = ({
  onHandleSearch,
  AddItemAction,
  title,
}) => {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  const moreRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const openMenu = useCallback((): void => {
    console.log("openMenu");
  }, []);

  // const openDeleteModal = useCallback((): void => {
  //   setModalOpen(true);
  // }, []);

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {/* <CustomTextField
            placeholder="Search"
            onChange={onHandleSearch}
            InputProps={{
              endAdornment: (
                <IconCustomButton>
                  <Search />
                </IconCustomButton>
              ),
            }}
          /> */}
          {/* <IconCustomButton onClick={openMenu}>
            <ActivateIcon />
          </IconCustomButton> */}
          <Button
            disableRipple
            ////onClick={closeSidebar}
            startIcon={<LinesIcon />}
            sx={{
              background: "#001215",
              color: "#FFF",
              display: "flex",
              gap: "7px",
            }}
          >
            All
          </Button>
          <Button
            disableRipple
            ////onClick={closeSidebar}
            startIcon={<ActivateIcon />}
            sx={{
              background: "#005914",
              color: "#FFF",
              display: "flex",
              gap: "7px",
              marginLeft: "14px",
            }}
          >
            Activate
          </Button>
          <IconCustomButton onClick={openMenu}>
            <PinIcon />
          </IconCustomButton>
          <IconCustomButton onClick={openMenu}>
            <CopyIcon />
          </IconCustomButton>
          <IconCustomButton onClick={AddItemAction}>
            <PrinterIcon />
          </IconCustomButton>
          <IconCustomButton onClick={openMenu}>
            <FilterIcon />
          </IconCustomButton>
          <IconCustomButton onClick={openMenu}>
            <AddIcon />
          </IconCustomButton>
        </Box>
      </Box>
      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
};

export default BulkActions;
