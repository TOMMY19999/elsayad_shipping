import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { selectUser } from "./userSlice";
import { logout } from "./userSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
export function WorkerSidebar() {
  const [open, setOpen] = React.useState(0);
  const user = useSelector(selectUser);
  const [unauthd, setUnauthed] = useState(0);
  const imgsrc =
    user.isphoto === 1
      ? `/images/profiles/${user.id}${
          user.pptype === "image/png"
            ? ".png"
            : user.pptype === "image/jpeg"
            ? ".jpg"
            : ".jpg"
        }`
      : `/images/profiles/avatar.png`;

  const router = useRouter();
  const dispatch = useDispatch(selectUser);
  const workeres = async () => {
    const worker = await (await axios.get("/api/workers")).data;
    setUnauthed(worker.filter((i) => i.authraized === 0).length);
  };
  useEffect(() => {
    workeres();
  }, []);

  const handleLogout = async () => {
    await axios
      .post(
        "/api/login",
        {
          username: user.username,
          password: user.password,
          logout: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        dispatch(logout());
        router.push("/worker/login");
      });
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // admin chapter
  const Adminacces = () => {
    if (user.is_admin === 1) {
      return (
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4  transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                الادارة
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link href={`/worker/${user.username}/employees`}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={5} className="h-3 w-5" />
                  </ListItemPrefix>
                  الموظفون
                  {unauthd > 0 ? (
                    <Chip
                      value={unauthd}
                      size="sm"
                      variant="ghost"
                      color="orange"
                      className="rounded-full ml-6 text-black"
                    />
                  ) : null}
                </ListItem>
              </Link>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={5} className="h-3 w-5" />
                </ListItemPrefix>
                الحسابات
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={5} className="h-3 w-5" />
                </ListItemPrefix>
                لسا هنستخدمها
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      );
    } else {
      return null;
    }
  };

  return (
    <Card
      dir="ltr"
      className="h-[calc(100vh-2rem)]  max-w-[20rem]  orgsidebar right-0  p-4 shadow-xl shadow-blue-gray-900/5 "
    >
      <div className="mb-2 p-4 text-center select-none">
        <Image
          src={imgsrc}
          alt="profilpic"
          width={200}
          height={200}
          className="rounded-full   w-12 h-12 absolute left-0 -ml-6  shadow-lg"
        />
        <Typography variant="h3" color="orange">
          {user.name}
        </Typography>
      </div>
      <List>
        <Adminacces />
        <Link href={`/worker/${user.username}`}>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            الطلبات
            <ListItemSuffix>
              <Chip
                value="10"
                size="sm"
                variant="ghost"
                color="orange"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link href={`/worker/${user.username}/profile`}>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            الملف الشخصي
          </ListItem>
        </Link>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
