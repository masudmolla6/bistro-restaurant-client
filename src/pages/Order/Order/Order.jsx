import { Helmet } from "react-helmet-async";
import orderImg from "../../../assets/shop/banner2.jpg"
import Cover from "../../shared/Cover/Cover";
import useMenu from "../../../hooks/useMenu";
import { useParams } from "react-router";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderTab from "../OrderTab/OrderTab";



const Order = () => {
        const categories = ["desserts", "pizza", "salad", "soup", "drinks"];

        const { category } = useParams();
        const initialIndex = categories.indexOf(category);
  
        const [tabIntex, setTabIndex] = useState(initialIndex);

  
        const [menu] = useMenu();
        const desserts = menu.filter((item) => item.category === "dessert");
        const soup = menu.filter((item) => item.category === "soup");
        const pizza = menu.filter((item) => item.category === "pizza");
        const salad = menu.filter((item) => item.category === "salad");
        const drinks = menu.filter((item) => item.category === "drinks");
    return (
      <div>
        <Helmet>
          <title>Bistro Boss || Order Food</title>
        </Helmet>
        <Cover img={orderImg} title={"Our Shop"}></Cover>
        <Tabs defaultIndex={tabIntex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>desserts</Tab>
            <Tab>pizza</Tab>
            <Tab>salad</Tab>
            <Tab>soup</Tab>
            <Tab>drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab items={desserts}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={pizza}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={salad}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={soup}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    );
};

export default Order;