import { Dimensions, StyleSheet } from "react-native";
import { primary } from "../../styles/colors";
import Diagnos from ".";

export const styles = StyleSheet.create({
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
    backgroundColor: "#FFF",
    margin: "auto",
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "95%",
    height: 100,
    overflow: "hidden",
    elevation: 3,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 70,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
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
cardScroll: {
  flexGrow: 0,
},
headerTitle: {
  fontSize: 18,
  fontWeight: "bold",
  flex: 1,
  textAlign: "center",
  marginRight: 40,
},
  
section: {
  marginVertical: 10,
  paddingHorizontal: 20,
},
  
sectionLabel: {
  fontSize: 16,
  color: "#FD9B63",
  marginBottom: 10,
  fontWeight: "500",
},

notesContainer: {
  backgroundColor: "white",
  borderStyle: "dashed",
  borderWidth: 2,
  borderColor: "#16423C",
  borderRadius: 12,
  padding: 15,
  minHeight: 150,
  maxHeight: 250,
},

notesText: {
  fontSize: 14,
  color: "#333",
  lineHeight: 20,
},

attachmentCard: {
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  padding: 15,
  borderRadius: 12,
  marginBottom: 10,
  elevation: 2,
},

attachmentIcon: {
  margin: 15,
},

attachmentInfo: {
  flex: 1,
},

attachmentType: {
  fontSize: 16,
  fontWeight: "500",
  color: "#333",
},

attachmentName: {
  fontSize: 14,
  color: "#666",
  marginTop: 2,
},

attachmentTime: {
  fontSize: 12,
  color: "#999",
  marginTop: 2,
},

dateTime: {
  fontSize: 12,
  color: "#777777",
},

// New styles for bottom buttons
bottomButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 20,
},

bottomButtonsRow: {
  position: 'absolute',
  bottom: 25,
  left: 0,
  right: 0,
  flexDirection: 'row',
  paddingHorizontal: 20,
  justifyContent: 'space-between',
},

actionButton: {
  backgroundColor: '#16423C',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 16,
  borderRadius: 20,
  width: '48%',
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

chatButton: {
  backgroundColor: '#FD9B63',
},

actionButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 8,
},

scrollContainer: {
  flex: 1,
}
});
