// app/work/[id].tsx

import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";

import { workData } from "./../src/data/work";

import { useVisitWorkflow } from "./../src/hooks/useVisitWorkflow";
import { validateVisitForm } from "./../src/utils/validators";

import StepApproval from "./../src/components/workflow/StepApproval";
import StepSafety from "./../src/components/workflow/StepSafety";
import StepVisitForm from "./../src/components/workflow/StepVisitForm";
import StepUpload from "./../src/components/workflow/StepUpload";
import StepCleaning from "./../src/components/workflow/StepCleaning";

export default function WorkDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  /**
   * Find selected work by route id
   */
  const selectedWork = useMemo(() => {
    return workData.find(
      (item) => item.id === String(id)
    );
  }, [id]);

  /**
   * Workflow Hook
   */
  const {
    step,
    nextStep,
    prevStep,
    form,
    updateForm,
    resetWorkflow,
  } = useVisitWorkflow(
    String(id),
    selectedWork?.plantName || ""
  );

  /**
   * Safety if wrong ID
   */
  if (!selectedWork) {
    return (
      <Screen>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>
            Work Not Found
          </Text>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  /**
   * Next Step Validation
   */
  const handleNext = () => {
    const error = validateVisitForm(
      form,
      step
    );

    if (error) {
      Alert.alert(
        "Validation",
        error
      );
      return;
    }

    nextStep();
  };

  /**
   * Submit Final
   */
  const handleSubmit = () => {
    Alert.alert(
      "Success",
      "Visit Submitted Successfully",
      [
        {
          text: "OK",
          onPress: () => {
            resetWorkflow();
            router.back();
          },
        },
      ]
    );
  };

  /**
   * Step Render
   */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepApproval
            visit={selectedWork}
            onNext={() => {
              updateForm({
                approvalConfirmed: true,
              });

              handleNext();
            }}
          />
        );

      case 2:
        return (
          <StepSafety
            form={form}
            updateForm={updateForm}
            onNext={handleNext}
            onBack={prevStep}
          />
        );

      case 3:
        return (
          <StepVisitForm
            form={form}
            updateForm={updateForm}
            onNext={handleNext}
            onBack={prevStep}
          />
        );

      case 4:
        return (
          <StepUpload
            form={form}
            updateForm={updateForm}
            onNext={handleNext}
            onBack={prevStep}
          />
        );

      case 5:
        return (
          <StepCleaning
            form={form}
            updateForm={updateForm}
            onBack={prevStep}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {selectedWork.title}
          </Text>

          <Text style={styles.sub}>
            Work ID #{selectedWork.id}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressWrap}>
          {[1, 2, 3, 4, 5].map(
            (item) => (
              <View
                key={item}
                style={[
                  styles.bar,
                  step >= item &&
                    styles.barActive,
                ]}
              />
            )
          )}
        </View>

        <Text style={styles.stepText}>
          Step {step} of 5
        </Text>

        {/* Dynamic Step */}
        {renderStep()}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  sub: {
    marginTop: 4,
    color: Theme.colors.gray,
    fontSize: 14,
  },

  progressWrap: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  bar: {
    flex: 1,
    height: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  barActive: {
    backgroundColor:
      Theme.colors.primary,
  },

  stepText: {
    marginBottom: 18,
    fontWeight: "600",
    color: Theme.colors.gray,
  },

  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  backBtn: {
    backgroundColor:
      Theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  backBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});