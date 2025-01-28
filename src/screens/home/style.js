import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";
export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#E9EFEC",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: -1,
  },
  header: {
    marginTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    color: "#000",
  },
  subGreeting: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  //Health Journey Banner
  healthCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#16423C",
    borderRadius: 20,
    height: 130,
    overflow: "hidden",
  },
  banner: {
    flex: 1,
    justifyContent: "center",
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    // Android shadow property
    //elevation: 5,
  },
  CircleBackground: {
    backgroundColor: "#6A9C89",
    borderRadius: 55,
    width: 110,
    height: 110,
    position: "absolute",
    top: -1,
    left: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: -1,
  },
  bannerAllText: {
    flex: 1,
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFF",
  },
  bannerSubText: {
    fontSize: 14,
    color: "#FD9B63",
    marginTop: 5,
  },
  // Search Bar
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    elevation: 2,
  },

  searchBar: {
    flex: 1,
    paddingLeft: 20,
    height: 40,
    fontSize: 16,
    color: "#0000",
  },

  filterIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 40,
  },
  //Services Section
  servicesSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
  },
  showMoreText: {
    color: "#FD9B63",
  },
  serviceCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "45%",
    elevation: 2,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    // Android shadow property
    //elevation: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  // doctor section
  doctorSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  doctorCard: {
    backgroundColor: "#FFF",
    marginRight: 15,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: 260,
    height: 140,
    overflow: "hidden",
  },
  circleWrapper: {
    position: "absolute",
    top: -10,
    left: -10,
    zIndex: -1,
  },
  circleOne: {
    position: "absolute",
    width: 110,
    height: 110,
    backgroundColor: "#6A9C89",
    borderRadius: 55,
    top: 30,
    left: 10,
    opacity: 0.6,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Android shadow property
    //elevation: 5,
  },
  circleTwo: {
    position: "absolute",
    width: 70,
    height: 70,
    backgroundColor: "#FD9B63",
    borderRadius: 35,
    top: 15,
    left: 60,
  },
  doctorImage: {
    position: "absolute",
    width: 100,
    height: 150,
  },
  doctorInfo: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 110,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#16423C",
    width: "100%",
    height: 60,
  },
  navButton: {
    alignItems: "center",
    paddingBottom: 15,
  },

  // Modal Styles
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
},
modalContainer: {
  width: "80%",
  backgroundColor: "#FFF",
  borderRadius: 10,
  padding: 20,
  alignItems: "center",
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 15,
},
filterOption: {
  padding: 10,
  width: "100%",
  borderBottomWidth: 1,
  borderBottomColor: "#E9EFEC",
},
filterText: {
  fontSize: 16,
  color: "#333",
},
closeButton: {
  marginTop: 15,
  padding: 10,
  backgroundColor: "#FD9B63",
  borderRadius: 5,
},
closeButtonText: {
  color: "#FFF",
  fontSize: 16,
},
};
