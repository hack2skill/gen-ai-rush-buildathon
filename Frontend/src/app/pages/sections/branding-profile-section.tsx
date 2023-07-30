import { EditOutlined } from "@mui/icons-material";
import { Button, Divider, Stack } from "@mui/material";
import { LabelValue } from "app/components/label-value";
import { Section } from "app/components/section";
import { BrandingProfileEditDialog } from "app/dialogs/branding-profile-edit-dialog";
import { useBrandProfile } from "app/providers/brand-profile-provider";
import { naIfEmpty } from "app/utils";
import { Fragment, useState } from "react";

export const BrandingProfileSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { brandProfile } = useBrandProfile();

  return (
    <Fragment>
      <Section
        heading="Branding Profile"
        action={
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
            sx={{ alignSelf: "end" }}
            variant="outlined"
            startIcon={<EditOutlined />}
          >
            Edit Profile
          </Button>
        }
      >
        <Stack spacing={2} p={2}>
          <LabelValue
            label="Company Name"
            value={naIfEmpty(brandProfile!.name)}
          />
          <Divider />
          <LabelValue
            label="Product Category"
            value={naIfEmpty(brandProfile!.productCategory)}
          />
          <Divider />
          <LabelValue
            label="Company Description"
            value={naIfEmpty(brandProfile!.description)}
          />
          <Divider />
          <LabelValue
            label="Purpose Statement"
            value={naIfEmpty(brandProfile!.purposeStatement)}
          />
          <Divider />
          <LabelValue
            label="Company Vision"
            value={naIfEmpty(brandProfile!.vision)}
          />
          <Divider />
          <LabelValue
            label="Target Gender"
            value={naIfEmpty(brandProfile!.targetGender)}
          />
          <Divider />
          <LabelValue
            label="Target Age Range"
            value={naIfEmpty(brandProfile!.targetAgeRange)}
          />
          <Divider />
          <LabelValue
            label="Target City"
            value={naIfEmpty(brandProfile!.targetCity)}
          />
          <Divider />
          <LabelValue
            label="Brand Voice"
            value={naIfEmpty(brandProfile!.brandVoice)}
          />
          <Divider />
          <LabelValue
            label="Brand Archetype"
            value={naIfEmpty(brandProfile!.archeType)}
          />
          <Divider />
        </Stack>
      </Section>
      <BrandingProfileEditDialog
        open={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
      />
    </Fragment>
  );
};
