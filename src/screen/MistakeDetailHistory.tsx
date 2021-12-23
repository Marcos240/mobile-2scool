import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import MultiSelect from 'react-native-multiple-select'
import { useDispatch, useSelector } from 'react-redux'
import { getStudent } from '../api/mistake'
import { color } from '../assets/color'
import { fontSize, heightDevice, widthDevice } from '../assets/size'
import Header from '../component/Header'
import { Student } from '../model/Mistake'
import { RootState } from '../redux/reducer'
import { DcpReport } from '../redux/reducer/mistake'
import { mainStyle } from './mainStyle'
import { Regulation } from '../model/Mistake'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { addClassMistakeHistory } from '../redux/action/mistakeHistory'

const MistakeDetailHistory = () => {
  const navigation = useNavigation()
  const dcpReport = useSelector((state: RootState) => state.mistakeHistory)
  const listRegulation = useSelector((state: RootState) => state.regulation)
  const listCriteria = useSelector((state: RootState) => state.criteria)
  const [listRegulation1, setListRegulation1] = useState<Regulation[]>([])
  const dispatch = useDispatch()
  const route = useRoute()
  const { classInfo, fault, indexFault, data }: any = route.params
  const [listStudent, setListStudent] = useState<Student[]>([])
  const [listPicker, setListPicker] = useState<any[]>([])
  const [criteria, setCriteria] = useState('')
  const [regulation, setRegulation] = useState(fault.regulationId)
  const [regulationName, setRegulationName] = useState(fault.regulationName)
  const [studentMistake, setStudentMistake] = useState<Student[]>(fault.relatedStudentIds)
  const [modalType, setModalType] = useState<string | null>(null)
  const [point, setPoint] = useState(fault.point)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    initStudent()
  }, [])
  useEffect(() => {
    const dataRegulation: any = listRegulation.find(item => item.id === fault?.regulationId);
    setCriteria(dataRegulation?.criteriaId);
    setListRegulation1(listRegulation.filter((item: any) => item.criteriaId === dataRegulation?.criteriaId));
  }, [])


  const initStudent = async () => {
    try {
      const res: any = await getStudent(classInfo.id)
      setListStudent(res.data.students)
    } catch (err) {
      Alert.alert('Error')
    }
  }
  useEffect(() => {
    if (criteria === '') setListRegulation1([])
    else setListRegulation1(listRegulation.filter(item => item.criteriaId === criteria))
  }, [criteria])

  const editMistake = () => {
    if (!isEdit) return setIsEdit(true)
    if (regulation === '') return Alert.alert('Thông báo', 'Vui lòng chọn vi phạm')
    const mistake = {
      regulationId: regulation,
      regulationName: regulationName,
      relatedStudentIds: studentMistake,
      point: point
    }
    const newDcpReport: DcpReport = JSON.parse(JSON.stringify(dcpReport))
    const classMistake: any = newDcpReport.dcpClassReports.find(item => item.classId === classInfo.id)
    const indexClassMistake = newDcpReport.dcpClassReports.findIndex(item => item.classId === classInfo.id)
    classMistake.faults.splice(indexFault, 1, mistake)
    const newDcpClassReports = newDcpReport.dcpClassReports
    newDcpClassReports[indexClassMistake] = classMistake
    newDcpReport.dcpClassReports = newDcpClassReports
    dispatch(addClassMistakeHistory(newDcpReport))
    navigation.goBack()
  }

  const onSelectCriteria = (e: any) => {
    setCriteria(e[0])
  }

  const onSelectRegulation = (e: any) => {
    setRegulation(e[0])
  }

  const onSelectStudentChange = (e: any) => {
    setStudentMistake(e)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chi tiết vi phạm" />
      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <MultiSelect
            fixedHeight
            single
            styleMainWrapper={styles.criteria}
            items={listCriteria}
            uniqueKey='id'
            onSelectedItemsChange={onSelectCriteria}
            selectedItems={[criteria]}
            selectText='Tiêu chí'
            searchInputPlaceholderText='Tên tiêu chí'
            styleTextDropdown={styles.criteriaName}
            styleTextDropdownSelected={styles.criteriaName}
            onChangeInput={(text) => console.warn(text)}
            tagRemoveIconColor='gray'
            tagBorderColor='gray'
            tagTextColor='black'
            selectedItemTextColor='red'
            selectedItemIconColor='red'
            itemTextColor='#000'
            displayKey='name'
            submitButtonColor='#CCC'
            submitButtonText='Submit'
            searchInputStyle={{ fontSize: fontSize.contentSmall }}
          />

          <MultiSelect
            fixedHeight
            single
            styleMainWrapper={styles.criteria}
            items={listRegulation1}
            uniqueKey='id'
            onSelectedItemsChange={onSelectRegulation}
            selectedItems={[regulation]}
            selectText='Tên vi phạm'
            searchInputPlaceholderText='Tên vi phạm'
            noItemsText='Vui lòng chọn tiêu chí'
            styleTextDropdown={styles.criteriaName}
            styleTextDropdownSelected={styles.criteriaName}
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor='gray'
            tagBorderColor='gray'
            tagTextColor='black'
            selectedItemTextColor='red'
            selectedItemIconColor='red'
            itemTextColor='#000'
            displayKey='name'
            submitButtonColor='#CCC'
            submitButtonText='Submit'
            searchInputStyle={{ fontSize: fontSize.contentSmall }}
          />

          <MultiSelect
            items={listStudent}
            uniqueKey='id'
            styleMainWrapper={styles.studentContainer}
            onSelectedItemsChange={onSelectStudentChange}
            selectedItems={studentMistake}
            selectText='Học sinh vi phạm'
            searchInputPlaceholderText='Tên học sinh'
            styleTextDropdown={styles.criteriaName}
            styleTextDropdownSelected={styles.criteriaName}
            onChangeInput={(text) => console.warn(text)}
            tagRemoveIconColor='gray'
            tagBorderColor='gray'
            tagTextColor='black'
            selectedItemTextColor='red'
            selectedItemIconColor='red'
            itemTextColor='#000'
            displayKey='name'
            submitButtonColor='#CCC'
            submitButtonText='Submit'
            searchInputStyle={{ fontSize: fontSize.contentSmall }}
          />

        </View>
      </ScrollView>
      {data?.status == "Created" ?
        <TouchableOpacity
          onPress={() => editMistake()}
          style={[mainStyle.buttonContainer, styles.buttonAdd]}>
          <MaterialCommunityIcons
            name={'update'}
            color={"white"}
            size={30}
          />
          <Text style={[mainStyle.buttonTitle, { fontSize: 18, marginHorizontal: 12 }]}>{isEdit ? 'Hoàn thành' : 'Cập nhật'}</Text>
        </TouchableOpacity> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: 'center',
    height: heightDevice
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.background,
  },
  contentContainer: {
    flex: 1,
  },
  criteria: {
    marginTop: '15%',
    width: widthDevice * 92 / 100,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 5,
  },
  criteriaName: {
    fontSize: fontSize.contentSmall,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 0
  },
  iconNext: {

  },
  studentList: {
    flex: 1,
    alignItems: 'flex-start',
  },
  studentContainer: {
    marginTop: '15%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 5,
    width: widthDevice * 92 / 100,
    minHeight: 160
  },
  studentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentName: {
    fontSize: fontSize.contentSmall,
    marginRight: 5
  },
  student: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.border,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  containerModalSelection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.blackOpacity,
  },
  wrappScrollView: {
    maxHeight: '70%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 5,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    alignItems: 'center'
  },
  buttonAdd: {
    backgroundColor: color.blueStrong,
    marginBottom: 10,
    // position: 'absolute',
    width: '92%',
    flexDirection: 'row'
  }
})

export default MistakeDetailHistory