import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { client } from "app/client";
import { brandArchetypeTypes } from "app/data/brand-archetype-types";
import { brandVoiceTypes } from "app/data/brand-voice-types";
import { productCategoryTypes } from "app/data/product-categories-types";
import { targetCityTypes } from "app/data/target-city-types";
import { targetGenderTypes } from "app/data/target-gender-types";
import { BrandProfileModel } from "app/models/brand-profile-model";
import { useBrandProfile } from "app/providers/brand-profile-provider";
import { useEffect, useState } from "react";

export const BrandingProfileEditDialog = (
  props: BrandingProfileEditDialogProps
) => {
  const { onDismiss, ...dialogProps } = props;
  const { open } = props;

  const { brandProfile, setBrandProfile } = useBrandProfile();

  const [formValues, setFormValues] = useState<BrandProfileModel>({
    ...brandProfile!,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitting(false);
      setFormValues(brandProfile!);
    }
  }, [brandProfile, open]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      {...dialogProps}
      onClose={() => onDismiss()}
    >
      <DialogTitle>Customize your branding profile</DialogTitle>
      <DialogContent>
        <Stack mt={2} spacing={3}>
          <TextField
            disabled={submitting}
            value={formValues.name}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                name: evt.target.value,
              }));
            }}
            fullWidth
            label="Company Name"
          />
          <TextField
            disabled={submitting}
            value={formValues.productCategory}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                productCategory: evt.target.value,
              }));
            }}
            select
            fullWidth
            label="Product Category"
          >
            {productCategoryTypes.map((value) => {
              return (
                <MenuItem
                  key={value}
                  value={value}
                  disabled={value.length === 0}
                >
                  {value.length === 0 ? "Select an option" : value}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            disabled={submitting}
            fullWidth
            label="Company Description"
            multiline
            minRows={2}
            maxRows={5}
            value={formValues.description}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                description: evt.target.value,
              }));
            }}
          />
          <TextField
            disabled={submitting}
            fullWidth
            label="Purpose Statement"
            value={formValues.purposeStatement}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                purposeStatement: evt.target.value,
              }));
            }}
          />
          <TextField
            disabled={submitting}
            fullWidth
            label="Company Vision"
            value={formValues.vision}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                vision: evt.target.value,
              }));
            }}
          />
          <TextField
            disabled={submitting}
            select
            fullWidth
            label="Target Gender"
            value={formValues.targetGender}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                targetGender: evt.target.value,
              }));
            }}
          >
            {targetGenderTypes.map((value) => {
              return (
                <MenuItem
                  key={value}
                  value={value}
                  disabled={value.length === 0}
                >
                  {value.length === 0 ? "Select an option" : value}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            disabled={submitting}
            fullWidth
            label="Target Age Range"
            placeholder="Example: 18-25"
            value={formValues.targetAgeRange}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                targetAgeRange: evt.target.value,
              }));
            }}
          />
          <TextField
            disabled={submitting}
            select
            fullWidth
            label="Target City"
            value={formValues.targetCity}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                targetCity: evt.target.value,
              }));
            }}
          >
            {targetCityTypes.map((value) => {
              return (
                <MenuItem
                  key={value}
                  value={value}
                  disabled={value.length === 0}
                >
                  {value.length === 0 ? "Select an option" : value}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            disabled={submitting}
            select
            fullWidth
            label="Brand Voice"
            value={formValues.brandVoice}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                brandVoice: evt.target.value,
              }));
            }}
          >
            {brandVoiceTypes.map((value) => {
              return (
                <MenuItem
                  key={value}
                  value={value}
                  disabled={value.length === 0}
                >
                  {value.length === 0 ? "Select an option" : value}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            disabled={submitting}
            select
            fullWidth
            label="Brand Archetype"
            value={formValues.archeType}
            onChange={(evt) => {
              setFormValues((prev) => ({
                ...prev!,
                archeType: evt.target.value,
              }));
            }}
          >
            {brandArchetypeTypes.map((value) => {
              return (
                <MenuItem
                  key={value}
                  value={value}
                  disabled={value.length === 0}
                >
                  {value.length === 0 ? "Select an option" : value}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <LoadingButton
          loading={submitting}
          onClick={() => {
            setSubmitting(true);
            client
              .put(
                "/data/brand",
                JSON.stringify({
                  ...formValues,
                })
              )
              .then((response) => {
                if (response.status === 200) {
                  setBrandProfile({ ...formValues });
                  setSubmitting(false);
                  onDismiss();
                }
              })
              .catch(() => {
                setSubmitting(false);
              });
          }}
          variant="contained"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export interface BrandingProfileEditDialogProps extends DialogProps {
  onDismiss: () => void;
}
