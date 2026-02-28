import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import CheckoutIcon from "@/assets/images/checkout/checkout-icon.jpeg";
import RedImage from "@/assets/images/logos/leanordo.jpeg";
import GreenImage from "@/assets/images/logos/orando.jpeg";
import YellowImage from "@/assets/images/logos/synder.jpeg";
import VioletImage from "@/assets/images/logos/zeta.jpeg";
import { RiArrowRightSLine } from "react-icons/ri";

const itemList = [
  { id: "red", img: RedImage, color: "#dd262f", price: 3.8 },
  { id: "violet", img: VioletImage, color: "#2596be", price: 19.1 },
  { id: "yellow", img: YellowImage, color: "#f8ea70", price: 27.5 },
  { id: "green", img: GreenImage, color: "#3e7f41", price: 10.08 },
];

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState(new Set());
  const [checkoutPrice, setCheckoutPrice] = useState(0.0);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const x = useMotionValue(0);

  // when swiping, background gradually changes from whitesmoke → blue
  const progressColor = useTransform(x, [0, 250], ["whitesmoke", "#4a90e2"]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x >= 250) {
      // fully swiped → success
      setIsPaid(true);
    } else {
      // not fully swiped → animate back smoothly
      setIsSwiping(false);
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  const addToCheckoutBox = (item) => {
    setAnimatingItem(item.id);
    setTimeout(() => {
      setCheckoutItems((prev) => {
        const updated = new Set(prev);
        updated.add(item);
        return updated;
      });
      setCheckoutPrice((prev) => prev + item.price);
      setAnimatingItem(null);
    }, 500);
  };

  const removeFromCheckoutBox = () => {
    setCheckoutItems((prev) => {
      const updated = new Set(prev);
      const arr = Array.from(updated);
      const lastItem = arr[arr.length - 1];
      if (lastItem) {
        updated.delete(lastItem);
        setCheckoutPrice((prev) => prev - lastItem.price);
      }
      return updated;
    });
  };

  return (
    <div className="craft-layout">
      <div className="checkout-container">
        <div className="checkout-items-row">
          {!isPaid &&
            itemList.map((item) => {
              const isVisible =
                !checkoutItems.has(item) && animatingItem !== item.id;

              return (
                <AnimatePresence key={item.id}>
                  {isVisible && (
                    <motion.div
                      className="item"
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        y: 200,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                    >
                      <img src={item.img} alt={item.id} />
                      <div
                        className="add-btn"
                        onClick={() => addToCheckoutBox(item)}
                      >
                        +
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
        </div>
        <div className={`checkout-box ${isPaid ? "purchased-box" : ""}`}>
          {isPaid ? (
            <>
              <div className="purchased-icon"></div>
              <p>Purchased !</p>
            </>
          ) : (
            <>
              <div className="flex gap-3">
                <div className="checkout-icon">
                  <img src={CheckoutIcon} alt="checkout" />
                </div>
                <div>
                  <h3 className="checkout-text">Checkout Basket (CB)</h3>
                  <p className="checkout-para">Price: ${checkoutPrice} USD</p>
                  <p className="checkout-para">Sales ID: #095482</p>
                </div>
              </div>

              <div className="selected-item-row">
                <div className="selected-items">
                  {[...Array(4)].map((_, idx) => {
                    const selectedItemsArray = Array.from(checkoutItems);
                    const item = selectedItemsArray[idx];
                    const isSelected = !!item;

                    return (
                      <div
                        key={idx}
                        className="selected-slot"
                        style={{
                          width: isSelected ? "25%" : "0px",
                          background: item?.color || "transparent",
                          borderTopLeftRadius: idx === 0 ? "20px" : "0",
                          borderBottomLeftRadius: idx === 0 ? "20px" : "0",
                          borderTopRightRadius: idx === 3 ? "20px" : "0",
                          borderBottomRightRadius: idx === 3 ? "20px" : "0",
                          transition: "width 0.4s ease-in-out",
                        }}
                      >
                        {isSelected && <img src={item.img} alt="" />}
                      </div>
                    );
                  })}
                </div>
                <div className="remove-btn" onClick={removeFromCheckoutBox}>
                  -
                </div>
              </div>
            </>
          )}
        </div>

        <motion.div
          className="swipe-to-pay"
          style={{
            backgroundColor: isPaid ? "#09a85b" : progressColor,
            transition: "background-color 0.3s ease",
          }}
        >
          {!isPaid && (
            <motion.div
              className="swipe-btn"
              drag="x"
              dragConstraints={{ left: 0, right: 280 }}
              dragElastic={0.05}
              style={{ x }}
              onDragStart={() => setIsSwiping(true)}
              onDragEnd={handleDragEnd}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <RiArrowRightSLine size={22} />
            </motion.div>
          )}

          {!isPaid && (
            <motion.p
              style={{
                flex: 1,
                textAlign: "center",
                color: isSwiping ? "#fff" : "#000",
                transition: "color 0.3s ease",
              }}
            >
              Swipe To Pay
            </motion.p>
          )}

          {isPaid && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                flex: 1,
                textAlign: "center",
                color: "#fff",
              }}
            >
              Payment Success
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
