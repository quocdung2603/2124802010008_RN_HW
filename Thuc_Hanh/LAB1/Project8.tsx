import React from 'react';
import {SectionList, Text, View, StyleSheet, SafeAreaView} from 'react-native';

type Person = {
  name: {
    title: string;
    first: string;
    last: string;
  };
};

type Section = {
  title: string;
  data: Person[];
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 1,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgb(170, 170, 170)',
  },
});

const groupPeopleByLastName = (data: Person[]): Section[] => {
  const groupedData = data.reduce<Record<string, Section>>((acc, person) => {
    const group = person.name.last[0].toUpperCase();
    if (!acc[group]) {
      acc[group] = {title: group, data: []};
    }
    acc[group].data.push(person);
    return acc;
  }, {});

  return Object.values(groupedData).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
};

const PEOPLE: Person[] = [
  {name: {title: 'Ms', first: 'Maeva', last: 'Scott'}},
  {name: {title: 'Ms', first: 'Maëlle', last: 'Henry'}},
  {name: {title: 'Mr', first: 'Mohamoud', last: 'Faaij'}},
  {name: {title: 'Mr', first: 'Mason', last: 'Harris'}},
];

const Project8: React.FC = () => {
  const sections = groupPeopleByLastName(PEOPLE);

  return (
    <SafeAreaView>
      <SectionList
        sections={sections}
        keyExtractor={item => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({section}: {section: Section}) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({item}: {item: Person}) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default Project8;
