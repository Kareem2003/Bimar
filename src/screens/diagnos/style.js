import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";
import Diagnos from ".";
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
    alignItems: "center",
    marginTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold",
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

  
  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
  },

  
  
  // doctor section
  doctorSection: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  DiagnosCard: {
    
    margin: "auto",
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "95%",
    height: 100,
    overflow: "hidden",
  },
  AttechmentCard: {
    backgroundColor: "#FFF",
    margin: "auto",
    marginBottom: 15,
    borderRadius: 14,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "90%",
    height: 100,
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
    backgroundColor: "#16423C",
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
    backgroundColor: "#16423C",
    borderRadius: 35,
    top: 15,
    left: 60,
  },
  attechmentImage: {
    position: "absolute",
    margin: 30,
    
  },
  doctorImage: {
    position: "absolute",
    width: 80,
    height: 80,
  },
  doctorInfo: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 70,
  },
  doctorName: {
    fontSize: 14,
    
    color: "#333",
    marginBottom: 5,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: "#333",
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
