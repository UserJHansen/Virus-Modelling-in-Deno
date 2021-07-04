#!/usr/bin/env python3
# Data Visualization using Python

import csv
import json

import matplotlib.pyplot as plt
import numpy as np

if __name__ == '__main__':
    # Saved Graph
    if (True):
        # Opening JSON file
        f = open('output/JSONforSavedGraph.txt',)

        # returns JSON object as
        # a dictionary
        data = json.load(f)

        # Closing file
        f.close()

        # Write the data into a csv file for excel
        with open('output/SavedData.csv', 'w') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(map(lambda x: [x], data))
            csvfile.close()

        plt.figure()

        # This code uses the NumPy Polynomial Fitting Algorithm to create an Algorithmic Equation
        fit = np.polyfit(np.array(range(len(data))), np.array(data), 5)
        a = fit[0]
        b = fit[1]
        c = fit[2]
        d = fit[3]
        e = fit[4]
        f = fit[5]
        x = np.array(range(len(data)))
        fit_equation = a * (x*x*x*x*x) + b * (x*x*x*x) + c * \
            (x*x*x) + d * (x*x) + e * (x) + f

        # Print data to Terminal
        # print(data)

        # Write Equation
        plt.text(
            5, -2, rf'$y={a}x^5+{b}x^4+{round(c,4)}x^3+{round(d,4)}x^2+{round(e,4)}x+{round(e,5)}$', fontsize=15)

        # plotting using plt.pyplot()
        plt.plot(data, 'go')

        # Plot Polynomial Curve
        plt.plot(fit_equation, color='r', alpha=0.5, label='Polynomial fit')

        # axis labeling and name
        plt.xlabel('No. Immune')
        plt.ylabel('No. Saved (After 20 Cycles)')
        plt.title(
            'Comparison between number of immune and number of people still safe at 20 days')

    # Number of Immune Graph
    if (True):
        # Opening JSON file
        f = open('output/JSONforGraph.txt',)

        # returns JSON object as
        # a dictionary
        data = json.load(f)

        # Closing file
        f.close()

        # Write the data into a csv file for excel
        with open('output/Data.csv', 'w') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(map(lambda x: [x], data))
            csvfile.close()

        plt.figure()

        # This code uses the NumPy Polynomial Fitting Algorithm to create an Algorithmic Equation
        fit = np.polyfit(np.array(range(len(data))), np.array(data), 4)
        a = fit[0]
        b = fit[1]
        c = fit[2]
        d = fit[3]
        e = fit[4]
        x = np.array(range(len(data)))
        fit_equation = a * (x*x*x*x) + b * (x*x*x) + c * (x*x) + d * (x) + e

        # Print data to Terminal
        # print(data)

        # Write Equation
        plt.text(
            25, 30, rf'$y={a}x^4+{round(b,4)}x^3+{round(c,4)}x^2+{round(d,4)}x+{round(e,4)}$', fontsize=15)

        # plotting using plt.pyplot()
        plt.plot(data, 'go')

        # Plot Polynomial Curve
        plt.plot(fit_equation, color='r', alpha=0.5, label='Polynomial fit')

        # axis labeling and name
        plt.xlabel('No. Immune')
        plt.ylabel('No Infected (After 20 Cycles)')
        plt.title(
            'Comparison between number of immune and infected people at 20 days')

    # Virus Progression Graph
    if (True):
        f = open('output/JSONforProgressionGraph.txt',)

        # returns JSON object as
        # a dictionary
        data = json.load(f)

        # Closing file
        f.close()

        # Write the data into a csv file for excel
        with open('output/ProgressionData.csv', 'w') as csvfile:
            writer = csv.writer(csvfile)
            for line in data:
                writer.writerows([line])

            csvfile.close()

        plt.figure()

        # Print data to Terminal
        # print(data)

        # plotting using plt.pyplot()
        i = 0
        for line in data:
            plt.plot(line, label=i)
            i += 1

        # axis labeling and name
        plt.xlabel('Time (days)')
        plt.ylabel('No Infected')
        plt.title(
            'Comparison between number of infected and time for each number of immune')
        plt.legend()

    # show the graph
    plt.show()
